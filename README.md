# Barista Buddy

A private learning notebook for a friend who moved to a new country and is training as a barista. Record the drinks you made, the routine your café taught you, what felt tricky, and new workplace phrases. Review those same notes before your next shift.

## Demo

The project is deployed to GitHub Pages from `dist/` by the workflow in `.github/workflows/pages.yml`. The public page was verified on October 5, 2026:

https://ryuuseiwa.github.io/barista-buddy/

The first AI-coach use downloads several hundred MB from Hugging Face. If the download fails or takes too long, the sample notebook and recall practice still demonstrate the rest of the app without AI.

## Run on your laptop

1. Extract the source ZIP.
2. Open a terminal in the extracted `barista-buddy` folder.
3. On Windows, run `py start.py`. On macOS or Linux, run `python3 start.py`.
4. Keep the terminal open. The app opens at `http://localhost:8765/`.

No pip install, Node build, account, or API key is required. Do not double-click `index.html`; JavaScript modules and the worker require HTTP. If the port is occupied, use `py start.py --port 8766`.

Use the same localhost address and browser each time: local storage is scoped to the browser and origin. Changing the port creates a separate notebook. Export/import your backup to move between browsers, hosted and local versions, or devices.

## What works

- Save and edit drink entries with shift date, count, size, espresso shots, milk, step sequence, trainer advice, difficulties, workplace phrases, and confidence.
- Browse a personal drink notebook with the latest recorded recipe and earlier shift entries.
- Practice recall cards based on the latest saved notes for each drink. Self-rate each card; cards marked for review are prioritized.
- Review workplace phrases you recorded yourself.
- Track drinks made over the last seven days, latest confidence, and self-rated practice counts.
- Ask an on-device AI coach about up to three recent drink entries, or organize the steps in a draft. AI output stays separate until you review it. Applying steps changes the draft; saving remains explicit.
- Export/import a validated JSON backup. Import deduplicates IDs; malformed backups do not change existing data.
- Try labeled sample entries. Removing samples keeps your real entries and practice records.

Recipes come from the notebook, not generic coffee instructions. Café methods vary. AI suggestions can be wrong and should be checked with the trainer; recall answers are the saved notes, not model-generated recipes.

## Open AI and privacy

The AI uses **HuggingFaceTB/SmolLM2-360M-Instruct**, an Apache-2.0 open-weight model, with **Transformers.js 3.8.1** and ONNX Runtime Web. It runs q4 inference in a browser worker on CPU/WASM. The model revision is pinned in `dist/ai-worker.js`:

`a10cc1512eabd3dde888204e902eca88bddb4951`

Open **Settings & backup → Prepare AI coach** while connected to the internet. The first download needs several hundred MB and may take a few minutes. A recent desktop Chrome or Edge is recommended. Inference can be slow on smaller devices. The model is downloaded from Hugging Face, but your drink notes and questions are not sent to Hugging Face for inference. There is no analytics or remote note database.

Notes and practice records live in IndexedDB on this browser. Model files use the Transformers browser cache. The service worker caches the app shell and bundled runtime files. Local inference can work offline after the necessary files are successfully downloaded and cached, but browser cache eviction, insufficient memory, browser compatibility, or clearing browser data can prevent it. Local serving is the recommended offline handoff; the original hosted URL can require internet/sign-in. Export a backup regularly.

The hosted service receives ordinary page requests and the model host receives file-download requests. “Local inference” does not mean no network activity during installation.

## Source layout

| File | Purpose |
| --- | --- |
| `dist/index.html`, `dist/styles.css` | Responsive notebook interface |
| `dist/app.js` | UI, IndexedDB persistence, backup, worker coordination, WebMCP |
| `dist/core.js` | Entry validation, sample data, recall cards, progress |
| `dist/ai-worker.js` | Pinned open-weight model and local generation |
| `dist/sw.js` | Same-origin offline app/runtime cache |
| `dist/vendor/` | Pinned Transformers.js and matching WASM runtime |
| `start.py` | Standard-library local launcher |

The app exposes `read_barista_notebook` and `start_barista_drink_entry` when the browser supports WebMCP. The latter stages an unsaved form, never saves notes.

## Validation and limits

Core and DOM-harness checks passed for input validation, latest-recipe cards, review prioritization, progress totals, saving/editing/reload persistence, safe rendering, import/deduplication/error handling, sample removal, and delete confirmation. Both WebMCP handlers were exercised with valid and invalid input in the DOM harness, with state read-back. A native WebMCP browser context was unavailable.

The pinned q4 model generated a response from sample trainer notes using local ONNX inference in Node on the build machine. The shipped WASM binary matches the same Transformers.js release.

On October 5, 2026, the local browser interface was checked at desktop (1280x900) and narrow (390x844) sizes with no horizontal overflow. A sample recall answer and self-rating updated the progress view; sample records were removed afterward. Browser-worker inference was attempted twice, but the Hugging Face model download failed around 72% on the first attempt and around 64% on the retry, both with an HTTP/2 protocol error. No browser-generated response or offline AI inference was verified. The model download is several hundred MB and depends on network speed; use Settings & backup → Prepare AI coach to retry. Core tests were not rerun because Node.js was unavailable in the local environment.

The workflow in `.github/workflows/pages.yml` publishes `dist/` to GitHub Pages. Check the repository’s Actions tab and verify the public URL before sharing it; a configured workflow is not proof of a successful deployment.

## Challenge handoff

The DEV submission follows the provided “Build for a Friend” headings and is [published on DEV](https://dev.to/ryuuseiwa/barista-buddy-a-little-more-confident-one-shift-at-a-time-3a16) with the required tags `devchallenge`, `weekendchallenge`, and `hf26challenge`.

The source repository is [ryuuseiwa/barista-buddy](https://github.com/ryuuseiwa/barista-buddy), and the public demo is deployed at [GitHub Pages](https://ryuuseiwa.github.io/barista-buddy/). Friend feedback has not been collected. The linked DevRelay testing session is private/unpublished and may not be accessible to judges.

Barista Buddy was built during the challenge window, not before it. No partner prize category is listed in the submission.

## Licenses and references

Application code: MIT (see `LICENSE`). Third-party licenses are in `dist/vendor/`. Model weights are downloaded separately and are governed by the model’s Apache-2.0 license.

- Model: https://huggingface.co/HuggingFaceTB/SmolLM2-360M-Instruct
- Browser inference: https://huggingface.co/docs/transformers.js/en/index
- Runtime: https://github.com/microsoft/onnxruntime
