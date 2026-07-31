"""design-sync upload manifest builder.

Lists ds-bundle/ files for a DesignSync write_files push, chunked under the
tool's 256-file cap. Skips machine-local artifacts (dot-prefixed entries,
_screenshots/) and the two files the upload sequence handles by hand
(_ds_needs_recompile fences the push, _ds_sync.json must be written last).

Usage:
    python .design-sync/make-batch.py <out.json> [--skip-bad] [--only A,B,C]

--skip-bad  omit components flagged `bad` in .render-check.json (never push a
            card you know is broken)
--only      restrict to the named components (batch pushes after grading)
"""

import json
import os
import sys

ROOT = "ds-bundle"
HANDLED_SEPARATELY = {"_ds_needs_recompile", "_ds_sync.json"}


def component_dirs(names):
    rc = json.load(open(f"{ROOT}/.render-check.json", encoding="utf-8"))
    return {f"components/{c['group']}/{c['name']}" for c in rc if c["name"] in names}


def main():
    out = sys.argv[1]
    args = sys.argv[2:]

    rc = json.load(open(f"{ROOT}/.render-check.json", encoding="utf-8"))
    skip = component_dirs({c["name"] for c in rc if c.get("bad")}) if "--skip-bad" in args else set()

    only = None
    if "--only" in args:
        names = set(args[args.index("--only") + 1].split(","))
        only = component_dirs(names)
        missing = names - {d.rsplit("/", 1)[1] for d in only}
        if missing:
            print(f"! not in render-check: {', '.join(sorted(missing))}", file=sys.stderr)

    files = []
    for dirpath, dirnames, filenames in os.walk(ROOT):
        dirnames[:] = [d for d in dirnames if d != "_screenshots"]
        for name in filenames:
            rel = os.path.join(dirpath, name).replace(os.sep, "/")[len(ROOT) + 1 :]
            if rel.startswith(".") or "/." in rel:
                continue
            if rel in HANDLED_SEPARATELY:
                continue
            if any(rel.startswith(d + "/") for d in skip):
                continue
            if only is not None:
                # `only` batches carry just their components' files.
                if not any(rel.startswith(d + "/") for d in only) and not rel.startswith("_preview/"):
                    continue
                if rel.startswith("_preview/"):
                    stem = rel.split("/", 1)[1].rsplit(".", 1)[0]
                    if stem not in {d.rsplit("/", 1)[1] for d in only}:
                        continue
            files.append(rel)

    files.sort()
    # 250 would fit the tool's 256-file cap, but each entry must carry both
    # `path` and `localPath`, and a 250-entry chunk prints too large to hand
    # to the tool in one piece. 110 keeps every chunk manageable.
    chunks = [files[i : i + 110] for i in range(0, len(files), 110)]
    json.dump(chunks, open(out, "w"), indent=0)
    print(f"{len(files)} files -> {len(chunks)} chunk(s): {[len(c) for c in chunks]}")


if __name__ == "__main__":
    main()
