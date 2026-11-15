#!/usr/bin/env python3
"""Cache-bust local .js/.css links in the site's HTML.

Adds ?v=<content hash> to every local script/stylesheet reference, so browsers
fetch a fresh copy as soon as a file changes (GitHub Pages lets browsers reuse
files for 10+ minutes otherwise). Runs automatically from the git pre-commit hook.
Also copies each table's column headers onto its cells as data-label="…", so
walkthrough.css can stack wide tables into labelled cards on phones. Only plain
tables (no class) with a <thead> and 3+ columns are labelled.
Prints the HTML files it changed.
"""
import hashlib, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REF = re.compile(r'((?:src|href)=")([^"#?]+\.(?:js|css))(?:\?v=[0-9a-f]*)?(")')

def stamp(match, page_dir):
    url = match.group(2)
    if url.startswith(('http:', 'https:', '//')):
        return match.group(0)
    path = os.path.join(ROOT, url.lstrip('/')) if url.startswith('/') else os.path.join(page_dir, url)
    if not os.path.isfile(path):
        return match.group(0)
    digest = hashlib.sha1(open(path, 'rb').read()).hexdigest()[:8]
    return f'{match.group(1)}{url}?v={digest}{match.group(3)}'

TABLE = re.compile(r'<table>(.*?)</table>', re.S)
TAG = re.compile(r'<[^>]+>')

def label_table(match):
    body = match.group(1)
    head = re.search(r'<thead>(.*?)</thead>', body, re.S)
    if not head:
        return match.group(0)
    names = [TAG.sub('', h).strip().replace('"', '&quot;') for h in re.findall(r'<th[^>]*>(.*?)</th>', head.group(1), re.S)]
    if len(names) < 3:
        return match.group(0)
    def label_row(row):
        cells = iter(names)
        return re.sub(r'<td(?![^>]*data-label)([^>]*)>', lambda c: f'<td data-label="{next(cells, "")}"{c.group(1)}>', row.group(0))
    tail = body[head.end():]
    tail = re.sub(r'<tr[^>]*>.*?</tr>', label_row, tail, flags=re.S)
    return '<table>' + body[:head.end()] + tail + '</table>'

changed = []
for dirpath, dirnames, filenames in os.walk(ROOT):
    dirnames[:] = [d for d in dirnames if not d.startswith('.') and d != 'tools']
    for name in filenames:
        if not name.endswith('.html'):
            continue
        page = os.path.join(dirpath, name)
        text = open(page, encoding='utf-8').read()
        new = REF.sub(lambda m: stamp(m, dirpath), text)
        new = TABLE.sub(label_table, new)
        if new != text:
            open(page, 'w', encoding='utf-8').write(new)
            changed.append(os.path.relpath(page, ROOT))
print('\n'.join(changed))
