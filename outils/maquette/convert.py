"""Convertit un fragment HTML de la maquette SINEBOX en JSX (TSX).

- styles en ligne -> objets style React ; classes de réglage mobile ajoutées d'après le style d'origine ;
- attributs SVG remis en camelCase ;
- textes : espaces insécables à la française, prix remplacés par formatPrix(...) depuis content/fr.ts ;
- .sac (image base64) -> <Image> next/image ;
- {{...}}, sc-for, sc-if et événements : signalés par DYN pour reprise à la main.
"""
import html, json, re, sys
_dumps = json.dumps
json.dumps = lambda x, **k: _dumps(x, ensure_ascii=False, **k)
from html.parser import HTMLParser

NBSP = " "
VOID = {"input", "br", "img", "hr", "meta", "link", "source", "stop", "path", "rect", "circle", "ellipse", "line", "polyline", "polygon", "use", "feturbulence", "fecolormatrix", "fegaussianblur", "feoffset", "feblend"}
SVG_TAGS = {"lineargradient": "linearGradient", "radialgradient": "radialGradient", "clippath": "clipPath",
            "feturbulence": "feTurbulence", "fecolormatrix": "feColorMatrix", "fegaussianblur": "feGaussianBlur",
            "textpath": "textPath", "foreignobject": "foreignObject", "feoffset": "feOffset", "feblend": "feBlend"}
ATTR = {"class": "className", "for": "htmlFor", "tabindex": "tabIndex", "viewbox": "viewBox",
        "preserveaspectratio": "preserveAspectRatio", "basefrequency": "baseFrequency", "numoctaves": "numOctaves",
        "stitchtiles": "stitchTiles", "gradientunits": "gradientUnits", "gradienttransform": "gradientTransform",
        "stddeviation": "stdDeviation", "readonly": "readOnly", "maxlength": "maxLength", "autocomplete": "autoComplete",
        "inputmode": "inputMode", "colspan": "colSpan", "rowspan": "rowSpan", "spellcheck": "spellCheck"}

# Réglages mobiles de la maquette (@container site max-width 760px), rattachés au texte du style d'origine.
MOBILE = [
    ("grid-template-columns", "m-gtc"), ("grid-column", "m-gc"),
    ("max-width: 1280px", "m-px"), ("max-width: 1000px", "m-px"), ("max-width: 900px", "m-px"),
    ("padding: 140px 32px", "m-py64"), ("padding: 150px 32px", "m-py64"),
    ("32px 120px", "m-pb64"), ("32px 110px", "m-pb64"), ("32px 140px", "m-pb64"),
    ("padding: 72px 32px", "m-pt36"), ("padding: 64px 32px", "m-pt36"), ("padding: 56px 32px", "m-pt36"),
    ("gap: 80px", "m-gap32"), ("gap: 64px", "m-gap32"), ("gap: 56px", "m-gap32"),
    ("font-size: 96px", "m-fs44"), ("font-size: 88px", "m-fs44"), ("font-size: 84px", "m-fs44"),
    ("font-size: 80px", "m-fs44"), ("font-size: 72px", "m-fs44"), ("font-size: 64px", "m-fs44"),
    ("font-size: 72px", "m-fs72"),
    ("font-size: 300px", "m-fs300"),
    ("padding: 80px 72px", "m-p80"), ("padding: 44px", "m-p26"), ("padding: 40px;", "m-p26"),
    ("position: sticky", "m-static"),
]

PRIX = {"1,50": "prix.kit", "4,50": "prix.troisKits", "15": "prix.colisJusqua12", "22": "prix.colisAuDela",
        "0": "prix.livraisonDeltom", "11,50": 'prixPack("affaires")', "21,50": 'prixPack("couple")',
        "9": 'prixPack("chien")', "7,50": 'prixPack("chat")', "12": 'prixPack("premiereVisite")', "9,50": 'prixPack("noel")'}

log = []

def camel(p):
    if p.startswith("--"):
        return p
    p = p.strip()
    if p.startswith("-webkit-"):
        p = "Webkit-" + p[8:]
    return re.sub(r"-([a-z])", lambda m: m.group(1).upper(), p)

def split_style(s):
    out, cur, depth, q = [], "", 0, None
    for ch in s:
        if q:
            cur += ch
            if ch == q:
                q = None
            continue
        if ch in "\"'":
            q = ch
        elif ch == "(":
            depth += 1
        elif ch == ")":
            depth -= 1
        if ch == ";" and depth == 0:
            out.append(cur); cur = ""
        else:
            cur += ch
    out.append(cur)
    return [x for x in out if x.strip()]

def police(v):
    if "Instrument Serif" in v: return "var(--f-serif)"
    if "DM Mono" in v: return "var(--f-mono)"
    if "Caveat" in v: return "var(--f-main)"
    if "Inter" in v: return "var(--f-sans)"
    return v

def style_obj(s, extra=None):
    parts = []
    decls = split_style(s) + (extra or [])
    for decl in decls:
        if ":" not in decl:
            continue
        k, v = decl.split(":", 1)
        if k.strip() == "font-family":
            v = police(v)
        if "!important" in v:
            log.append("IMPORTANT retiré: " + decl.strip())
            v = v.replace("!important", "")
        parts.append((camel(k), f"{json.dumps(camel(k))}: {json.dumps(v.strip())}" if k.strip().startswith("--") else f"{camel(k)}: {json.dumps(v.strip())}"))
    vus = {}
    for cle, txt in parts:
        vus.pop(cle, None)
        vus[cle] = txt
    corps = "{ " + ", ".join(vus.values()) + " }"
    if any(c.startswith("--") for c in vus):
        corps = "{ " + ", ".join(vus.values()) + " } as React.CSSProperties"
    return corps

def typo(t):
    t = re.sub(r" ([:;?!»])", NBSP + r"\1", t)
    t = t.replace("« ", "«" + NBSP)
    t = re.sub(r"(\d) (h\b|€)", "\\1" + NBSP + "\\2", t)
    return t

def text_jsx(t):
    if not t.strip():
        return '{" "}' if t else ""
    if "{{" in t:
        log.append("DYN texte: " + t.strip()[:80])
        return "{/* DYN " + t.strip().replace("*/", "") + " */}"
    t = typo(t)
    pieces, last = [], 0
    for m in re.finditer(r"(\d+(?:,\d{2})?)" + "[  ]€", t):
        val = m.group(1)
        if val in PRIX:
            pieces.append(json.dumps(t[last:m.start()]))
            pieces.append(f"formatPrix({PRIX[val]})")
            last = m.end()
        else:
            log.append(f"PRIX non relié: {val} € dans «{t.strip()[:60]}»")
    pieces.append(json.dumps(t[last:]))
    t2 = "{" + " + ".join(p for p in pieces if p != '""') + "}"
    t2 = t2.replace("contact@sinebox.fr", '" + fr.coordonnees.email + "')
    t2 = t2.replace("24\u00a0h", '" + delais.reponse + "')
    t2 = re.sub(r"1 bougie(?! LED)", "1 bougie LED", t2)
    return t2

class Conv(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.out, self.stack = [], []
    def handle_starttag(self, tag, attrs):
        if tag in ("sc-for", "sc-if"):
            d = dict(attrs)
            log.append(f"DYN {tag}: {d}")
            self.out.append(f"{{/* DYN {tag} {json.dumps(d)} */}}")
            self.stack.append(tag)
            return
        d = dict(attrs)
        cls = (d.get("class") or "").split()
        st = d.get("style") or ""
        if "sac" in cls:
            self.out.append('<Image src={IMG_SAC} alt={ALT_SAC} fill sizes="(max-width: 760px) 45vw, 320px" style={{ objectFit: "contain" }} />')
            if tag not in VOID:
                self.stack.append("__skip__")
            return
        extra = []
        for sub, c in MOBILE:
            if sub in st and c not in extra:
                extra.append(c)
        if "{{" in st:
            extra = []
        cls = cls + extra
        name = SVG_TAGS.get(tag, tag)
        out = [f"<{name}"]
        if "font-family" in d and "style" not in d:
            attrs = [(k, v) for k, v in attrs if k != "font-family"] + [("style", "font-family: " + d["font-family"])]
        for k, v in attrs:
            if k in ("class",):
                continue
            if k == "style":
                if "{{" in v:
                    log.append("DYN style: " + v)
                    out.append(" style={{}} /* DYN " + v + " */")
                else:
                    out.append(" style={" + style_obj(v) + "}")
                continue
            if k.startswith("on"):
                log.append(f"DYN event {k}={v}")
                out.append(f" /* DYN {k}={v} */")
                continue
            if k.startswith("hint-"):
                continue
            if v is not None and "{{" in v:
                log.append(f"DYN attr {k}={v}")
                out.append(f" /* DYN {k}={v} */")
                continue
            jk = ATTR.get(k, k if (k.startswith("aria-") or k.startswith("data-")) else camel(k) if "-" in k or ":" in k else k)
            jk = jk.replace(":", "")
            if v is None:
                out.append(f" {jk}")
            else:
                out.append(f" {jk}={json.dumps(v)}")
        if cls:
            out.append(f' className={json.dumps(" ".join(cls))}')
        if tag in VOID:
            out.append(" />")
            self.out.append("".join(out))
        else:
            out.append(">")
            self.out.append("".join(out))
            self.stack.append(name)
    def handle_endtag(self, tag):
        if tag in VOID or not self.stack:
            return
        top = self.stack.pop()
        if top == "__skip__":
            return
        if top in ("sc-for", "sc-if"):
            self.out.append(f"{{/* DYN fin {top} */}}")
            return
        self.out.append(f"</{top}>")
    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VOID and self.stack:
            self.handle_endtag(tag)
    def handle_data(self, data):
        if self.stack and self.stack[-1] == "__skip__":
            return
        self.out.append(text_jsx(data))

HREF = {"#top": "accueil", "#essai": "essai", "#appel": "appel", "#merci": "merci", "#ccm": "ccm", "#kits": "kits",
        "#packs": "packs", "#tarifs": "tarifs", "#blog": "blog", "#faq": "faq"}
TEXTE = [(r"étiquette", "etiquette"), (r"comment ça marche|fonctionnement", "ccm"), (r"calcul|tarif", "tarifs"),
         (r"pack", "packs"), (r"associé|fiche", "associe"), (r"compatibilit", "compat"), (r"maquette|marque|personnalis|logo", "marque"),
         (r"hôtes|hotes", "hotes"), (r"conciergeries", "conciergeries"), (r"livraison|zone|· paris|seine|marne|yvelines|essonne|oise", "livraison"),
         (r"à propos|notre histoire", "apropos"), (r"question|faq", "faq"), (r"nous contacter", "contact"), (r"appel", "appel"),
         (r"accueil des voyageurs", "rubrique"), (r"consommables et coûts|organisation d.une conciergerie", "blog"), (r"journal|guides|ressources|articles", "blog"),
         (r"kit d’accueil|kit d'accueil|contenu exact|détail des kits|kit salle|kit cuisine|kit entretien|les kits", "kits")]

def texte_brut(jsx):
    t = re.sub(r"<[^>]+>", " ", jsx)
    t = "".join(json.loads(x) for x in re.findall(r'"(?:[^"\\]|\\.)*"', t) if True) if False else t
    return t

def liens(jsx):
    def remplace(m):
        href, attrs, corps = m.group(1), m.group(2), m.group(3)
        if href.startswith("http"):
            return m.group(0).replace("<a ", '<a target="_blank" rel="noopener" ', 1) if "target=" not in m.group(0) else m.group(0)
        txt = re.sub(r"<[^>]+>", " ", corps)
        txt = re.sub(r'\\u([0-9a-f]{4})', lambda x: chr(int(x.group(1), 16)), txt).lower()
        cle = HREF.get(href)
        if 'className="post"' in attrs or "className=\"post" in attrs:
            cle = "article"
        if not cle:
            for motif, c in TEXTE:
                if re.search(motif, txt):
                    cle = c; break
        if not cle:
            log.append("LIEN non relié: " + href + " " + txt.strip()[:60])
            cle = "accueil"
        mode = "masquer" if ("→" in corps or re.search(r'className="[^"]*\bb[12]\b', attrs)) else "texte"
        return f'<LienPage page="{cle}" sansPage="{mode}"{attrs}>{corps}</LienPage>'
    return re.sub(r'<a href="([^"]*)"((?:(?!>).)*)>(.*?)</a>', remplace, jsx, flags=re.S)

def lignes_tableau(jsx):
    """Tableaux en grille de la maquette (role="table") : regroupe les cellules en lignes (role="row", display: contents)
    et marque la première cellule de chaque ligne comme en-tête de ligne, pour les lecteurs d'écran."""
    def remplace(m):
        ouverture, corps = m.group(1), m.group(2)
        n = int(re.search(r'"--n": "(\d+)"', ouverture).group(1))
        cellules = re.findall(r'<span role="(?:columnheader|cell)".*?</span>', corps, re.S)
        reste = re.sub(r'<span role="(?:columnheader|cell)".*?</span>', "", corps, flags=re.S)
        lignes = []
        for i in range(0, len(cellules), n):
            groupe = cellules[i:i + n]
            if i > 0:
                groupe[0] = groupe[0].replace('role="cell"', 'role="rowheader"', 1)
            lignes.append('<div role="row" style={{ display: "contents" }}>' + "".join(groupe) + "</div>")
        return ouverture + "".join(lignes) + reste.replace('{" "}', "") + "</div>"
    return re.sub(r'(<div role="table"[^>]*>)((?:(?!<div role="table").)*?)</div>', remplace, jsx, flags=re.S)

def convertir(fragment):
    c = Conv(); c.feed(fragment); c.close()
    return lignes_tableau(liens("".join(c.out)))

if __name__ == "__main__":
    src = open(sys.argv[1], encoding="utf-8").read()
    print(convertir(src))
    for l in log:
        print("LOG", l, file=sys.stderr)
