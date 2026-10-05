# Barista Buddy — Codex handoff

Read this file and `README.md` before continuing. This is an existing app built in ChatGPT Work, transferred into VS Code for local testing, improvements, and challenge preparation.

## User and goal

The user prefers the name Dan and uses Windows with VS Code and Codex installed. She is building for a real friend who recently moved to a new country and is training as a barista. His name, country, native language, and real café recipes have not been provided. Do not invent them.

The app should help him remember what drinks he made, the steps he learned, trainer advice, difficulties, and workplace vocabulary. The challenge is Hacktoberfest Weekend Challenge: Build for a Friend. Open-source AI must be meaningful to the project. Dan liked this implementation and asked to continue it in VS Code.

## Current app

- HTML/CSS/JavaScript app with Today, Drink notebook, Practice, and My progress views.
- IndexedDB stores the notebook and self-rated practice records on the browser/device.
- Each drink entry has date, count, cup size, espresso shots, milk, steps, difficulty, trainer advice, workplace phrase, other notes, and confidence.
- Notebook uses the latest saved recipe per drink while retaining shift history.
- Recall and phrase cards are derived directly from recorded notes. Practice is self-rated, not AI-graded.
- The on-device AI coach reads recent saved notes. AI can organize draft steps, with a review/apply/save flow.
- JSON backups are validated and deduplicated. Samples are explicitly labeled and can be removed while retaining real entries.
- A service worker caches app/runtime assets. Offline inference is conditional on model download, cache availability, and browser support.
- Optional WebMCP handlers read the notebook and stage an unsaved drink-entry form.

## Open AI implementation

- Transformers.js **3.8.1**, bundled locally in `dist/vendor/`.
- Matching ONNX Runtime Web JS/WASM assets are bundled.
- Model: `HuggingFaceTB/SmolLM2-360M-Instruct`.
- Pinned revision: `a10cc1512eabd3dde888204e902eca88bddb4951`.
- Quantization: q4. Browser device: WASM/CPU, single thread, in a module worker.
- Model weights are downloaded separately from Hugging Face when the user clicks Prepare AI coach. No model weights are in this ZIP.
- Inference receives notes locally. There is no remote model API, key, analytics, or note database.
- Notes should reflect the café’s actual instructions. Do not turn model output into an authoritative recipe. Keep AI output labeled and reviewable.

## Run locally

From the folder containing `start.py`:

```powershell
py start.py
```

The standard-library launcher serves `dist/` at `http://localhost:8765/` and opens the browser. No dependency install or build is needed to use the app.

If `py` is unavailable but Python is installed, try `python start.py`. If the port is occupied, use `py start.py --port 8766`. Local notes are scoped to the browser and origin; changing ports creates a separate notebook. Import a backup to move notes between hosted and local versions.

Core checks, if Node is installed:

```powershell
node tests/core.test.mjs
```

## What was verified

The build ran meaningful core and DOM-harness checks for:

- Entry validation, including dates, quantities, confidence, and optional shot counts.
- Latest-recipe recall cards, review prioritization, phrase cards, and aggregate progress.
- Form save/edit, IndexedDB persistence across reloads, and safe rendering of user text.
- Removing sample entries while retaining real entries and practice.
- Delete confirmation, backup import/deduplication, and rejection of invalid backups.
- Both WebMCP handlers with valid/invalid input and state read-back in a simulated DOM registry.

A pinned q4 model generated a response from sample trainer advice using local ONNX inference in Node on the original build machine. The bundled WASM binary matched the same release’s runtime binary.

Local browser checks on October 5, 2026: the interface rendered at 1280x900 and 390x844 with no horizontal overflow. Labeled sample entries loaded, a recall answer displayed, and rating a card updated the progress count. All sample entries and practice records were removed after testing.

Browser-worker model preparation was attempted twice. The Hugging Face CDN transfer failed around 72% on the first attempt and around 64% on the retry, both with an HTTP/2 protocol error. No browser-generated response or offline AI inference was verified. The app’s Retry AI download control remains available in Settings. Node tests could not be rerun because Node is unavailable in this environment. Native WebMCP registration was not tested. Do not describe Node inference as browser inference, or DOM-harness checks as visual browser testing.

## Deployment and source continuity

The app has a GitHub Pages deployment at:

https://ryuuseiwa.github.io/barista-buddy/

Source repository:

https://github.com/ryuuseiwa/barista-buddy

The Pages workflow succeeded and the public demo was opened in a browser on October 5, 2026. Model download/inference was not verified in the browser.

The original source snapshot was published with commit:

`22000c191ddc3bbde4b6cfa3c43885959a22f2dc`

This ZIP is a portable source export, not a clone with original Git history. It contains no deployment credentials, original `.git` directory, or Sites identity manifest. The public repository starts a new history and does not contain the original Git history.

## DEV submission and references

- `docs/SUBMISSION.md` is the canonical body of the published DEV submission.
- `docs/submission-template.pdf` is the supplied template screenshot.
- `docs/submission-requirements.pdf` is the user-supplied challenge page snapshot.

The post follows the required headings and is published at https://dev.to/ryuuseiwa/barista-buddy-a-little-more-confident-one-shift-at-a-time-3a16 with tags `devchallenge`, `weekendchallenge`, `hf26challenge`. AI assistance is disclosed as “Some AI (AI-assisted).” It links to the public repository and GitHub Pages demo and accurately discloses that browser inference was not verified. Friend feedback has not been collected; do not invent any.

The official deadline was October 5, 2026 at 06:59 UTC, which is October 5 at 1:59 a.m. America/Chicago. Verify the official challenge page if continuing at a later time:

https://dev.to/challenges/hacktoberfest-weekend-2026-10-01

The rules require building during the challenge window. Any post-deadline commits must be noted in the README. Follow the actual current rules; do not silently claim late changes existed before the deadline.

## DevRelay

Dan wants to use DevRelay. The actual local testing/refinement session is saved unpublished at:

https://dev.to/agent_sessions/barista-buddy-local-browser-testing-js1pha

It records testing/refinement of this existing project, not the original build. The session is private and may not be accessible to judges.

## Remaining work

1. Retry AI preparation on a better connection; verify a browser-generated response grounded in notebook notes and test offline use before claiming either.
2. Have the friend try it if available; include only real feedback.
3. If making commits after the challenge deadline, note them in the README and do not represent them as work completed within the challenge window.

Continue this implementation; avoid replacing a working app merely to change frameworks. Never fabricate testing, user feedback, partner-prize eligibility, session recordings, repository links, or published status.
