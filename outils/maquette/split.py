"""Découpe un modèle de page en éléments de premier niveau (sous le div.sx racine)."""
import sys, re, json
from html.parser import HTMLParser

class Splitter(HTMLParser):
    def __init__(self, src):
        super().__init__(convert_charrefs=False)
        self.src = src; self.depth = 0; self.parts = []; self.start = None; self.lines = src.split("\n")
        self.offsets = [0]
        for l in self.lines: self.offsets.append(self.offsets[-1] + len(l) + 1)
    def pos(self):
        ln, col = self.getpos(); return self.offsets[ln - 1] + col
    VOID = {"input","br","img","hr","meta","link","source"}
    def handle_starttag(self, tag, attrs):
        if tag in self.VOID: return
        self.depth += 1
        if self.depth == 2:
            self.start = (self.pos(), tag, dict(attrs))
    def handle_endtag(self, tag):
        if tag in self.VOID: return
        if self.depth == 2 and self.start:
            p, t, a = self.start
            end = self.src.find(">", self.pos()) + 1
            self.parts.append((t, a.get("id", ""), self.src[p:end]))
            self.start = None
        self.depth -= 1

src = open(sys.argv[1], encoding="utf-8").read()
s = Splitter(src); s.feed(src)
out = sys.argv[2]
for i, (t, id_, frag) in enumerate(s.parts):
    nom = f"{i:02d}-{t}-{id_ or 'x'}.html"
    open(f"{out}/{nom}", "w").write(frag)
    print(nom, len(frag))
