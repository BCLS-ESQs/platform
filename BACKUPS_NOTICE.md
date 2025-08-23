Repository backups
------------------
Backups of files changed during the 'point frontend API to production backend' fix are kept in the ignored folder epo-bak/.
This folder is intentionally untracked (listed in .gitignore) so temporary backup files are preserved locally but do not clutter the repository.

Location: ./repo-bak/

How to restore a file from backups:
  1) Look in repo-bak/ for the desired .bak file (timestamped).
  2) Copy it back to the desired path, e.g.:
     Copy-Item -LiteralPath .\repo-bak\index.html.20250819131618.bak -Destination .\index.html -Force
  3) Inspect the file and then git add / git commit if you want it tracked again.

If you want this backup archived elsewhere, consider zipping repo-bak/ and moving the zip to a safe archive location.
