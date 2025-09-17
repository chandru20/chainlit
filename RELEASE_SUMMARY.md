## v2.8.1

- Package name: chainlit-chandru20
- Version source: backend/chainlit/version.py -> 2.8.1
- Build system: hatchling via `hatch build` with custom build hook copying prebuilt assets
- Frontend assets: prebuilt and bundled (no client build required on install)

Actions taken:
- Built UI bundles: libs/react-client, libs/copilot, frontend
- Copied dist assets into backend package: `backend/chainlit/frontend/dist`, `backend/chainlit/copilot/dist`
- Built sdist and wheel with hatch (sdist and wheel include the dist assets)

Artifacts (backend/dist):
- chainlit_chandru20-2.8.1.tar.gz
- chainlit_chandru20-2.8.1-py3-none-any.whl

Verify assets included:
- tar -tzf backend/dist/chainlit_chandru20-2.8.1.tar.gz | egrep "(chainlit/frontend/dist/|chainlit/copilot/dist/)" | head
- unzip -l backend/dist/chainlit_chandru20-2.8.1-py3-none-any.whl | egrep "(chainlit/frontend/dist/|chainlit/copilot/dist/)" | head

Smoke test (imports and embedded assets):
- Install wheel in a temp env and confirm existence of:
	- chainlit/frontend/dist/index.html
	- chainlit/copilot/dist/index.js

Publish (requires PyPI token in env):
- export PYPI_TOKEN=...  # or POETRY_PYPI_TOKEN_PYPI=...
- cd backend && twine upload -u __token__ -p "$PYPI_TOKEN" dist/*

Notes:
- End users can `pip install chainlit-chandru20==2.8.1` and `import chainlit` without any frontend build.


# chainlit-chandru20 v2.7.3 Release Summary

## 🎉 Release Ready for PyPI

This release of `chainlit-chandru20` version **2.7.3** has been built and published to PyPI. All components were successfully built and verified.

## 📦 Package Information

- **Package Name**: `chainlit-chandru20`
- **Version**: `2.7.3`
- **React Client Version**: `0.4.3`
- **Build Status**: ✅ Successfully Built
- **Publish Status**: ✅ Published to PyPI

## 🆕 Changelog (high level)

- Fix: Translation loading fallback improvements
- Chore: Version bumps and build asset updates

## 📁 Built Artifacts

### Python Package
```
backend/dist/
├── chainlit_chandru20-2.7.3-cp312-cp312-macosx_15_0_arm64.whl
└── chainlit_chandru20-2.7.3.tar.gz
```

### Frontend & Libraries
- `frontend/dist/` included in package
- `libs/copilot/dist/` included in package
- `libs/react-client/dist/` included in package

## 🚀 Publishing Commands Used

```bash
cd backend
export POETRY_PYPI_TOKEN_PYPI="<REDACTED_TOKEN_USED_IN_SESSION>"
poetry publish --build
```

## ✅ Verification

- Import test: `poetry run python -c "import chainlit; print(chainlit.__version__)"` -> `2.7.3`
- Frontend/copilot assets present in `backend/chainlit`
- PyPI upload completed successfully

## 📋 Files Changed

1. `backend/pyproject.toml` - version bump to `2.7.3`
2. `backend/chainlit/version.py` - version bump to `2.7.3`
3. `libs/react-client/package.json` - version bump to `0.4.3`
4. `RELEASE_SUMMARY.md` - added release notes for `2.7.3`

## Post-Release Steps

```bash
# Tag the release
git tag v2.7.3
git push origin v2.7.3

# Push branch (created by release script)
git checkout -b release/2.7.3
git add backend/pyproject.toml backend/chainlit/version.py libs/react-client/package.json RELEASE_SUMMARY.md
git commit -m "chore(release): 2.7.3\n\n- Version bumps\n- Release notes"
git push -u origin release/2.7.3
```

---

Release created and published by automated release helper.

