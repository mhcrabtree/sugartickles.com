#!/usr/bin/env python3
"""Cache-bust local .js/.css links in the site's HTML.

Adds ?v=<content hash> to every local script/stylesheet reference, so browsers
fetch a fresh copy as soon as a file changes (GitHub Pages lets browsers reuse
files for 10+ minutes otherwise). Runs automatically from the git pre-commit hook.
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

changed = []
for dirpath, dirnames, filenames in os.walk(ROOT):
    dirnames[:] = [d for d in dirnames if not d.startswith('.') and d != 'tools']
    for name in filenames:
        if not name.endswith('.html'):
            continue
        page = os.path.join(dirpath, name)
        text = open(page, encoding='utf-8').read()
        new = REF.sub(lambda m: stamp(m, dirpath), text)
        if new != text:
            open(page, 'w', encoding='utf-8').write(new)
            changed.append(os.path.relpath(page, ROOT))
print('\n'.join(changed))
