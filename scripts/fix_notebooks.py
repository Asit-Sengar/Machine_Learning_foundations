#!/usr/bin/env python3
"""Scan notebooks under notebooks/ and truncate markdown cells to max 2 lines."""
from pathlib import Path
import json

root = Path(".")
notebooks = list((root / "notebooks").rglob("*.ipynb"))
if not notebooks:
    print("No notebooks found under notebooks/")
    exit(0)

changed_files = []
for nb in notebooks:
    data = json.loads(nb.read_text(encoding="utf-8"))
    cells = data.get("cells", [])
    changed = False
    for cell in cells:
        if cell.get("cell_type") == "markdown":
            source = cell.get("source", [])
            if isinstance(source, str):
                text = source
            else:
                text = "".join(source)
            # split into lines preserving line endings
            lines = text.splitlines(keepends=True)
            if len(lines) > 2:
                new_lines = lines[:2]
                cell["source"] = new_lines
                changed = True
    if changed:
        nb.write_text(json.dumps(data, ensure_ascii=False,
                      indent=1) + "\n", encoding="utf-8")
        changed_files.append(str(nb))

print(f"Processed {len(notebooks)} notebooks.")
if changed_files:
    print("Modified notebooks:")
    for f in changed_files:
        print(f)
else:
    print("No changes needed.")
