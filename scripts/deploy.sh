#!/usr/bin/env bash
#
# Build the site and publish it to the gh-pages branch.
#
# Used instead of a GitHub Actions workflow because the signed-in token does not
# carry the `workflow` scope. To move to Actions later, run
#   gh auth refresh -h github.com -s workflow
# then rename .github/workflows/deploy.yml.disabled back to deploy.yml.

set -euo pipefail
cd "$(dirname "$0")/.."

REMOTE="$(git remote get-url origin)"
REPO_NAME="$(basename -s .git "$REMOTE")"

echo "→ Building for https://<user>.github.io/${REPO_NAME}/"
VITE_BASE="/${REPO_NAME}/" npm run build

# GitHub Pages otherwise runs the output through Jekyll, which skips some files.
touch dist/.nojekyll

echo "→ Publishing to gh-pages"
rm -rf dist/.git
git -C dist init -q -b gh-pages
git -C dist add -A
git -C dist -c user.name="deploy" -c user.email="deploy@local" \
  commit -q -m "Deploy $(date -u +%Y-%m-%dT%H:%M:%SZ)"
git -C dist push -q -f "$REMOTE" gh-pages
rm -rf dist/.git

echo "✓ Published. The live site updates within a minute."
