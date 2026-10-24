# TUO

> A Chrome extension that reads the page you're on, flags statements that look false or misleading, and shows related sources so you can judge for yourself.

TUO scrapes the visible text of any webpage, sends it to a small local backend for AI fact-checking, and highlights the suspicious phrases directly on the page. Hovering a highlight opens a card with related search results and lets you cast your own **TRUE / FALSE** verdict before comparing it with the AI's verdict and credibility score.

---

## How it works

```text
┌──────────────────────┐   page text    ┌──────────────────────────┐
│  Chrome Extension    │ ─────────────▶ │  Express backend (:3000) │
│  content.js          │                │  POST /analyze           │
│  - scrape new text   │                │                          │
│  - highlight phrases │ ◀───────────── │  1. LLM fact-check       │
│  - tooltip + verdict │  JSON results  │     (OpenRouter)         │
└──────────────────────┘                │  2. Sources per phrase   │
                                        │     (Serper / Google)    │
                                        └──────────────────────────┘
```

1. **Scrape**: `content.js` collects the page's visible text and links. It remembers which lines it has already sent, so only new content is analyzed.
2. **Watch**: a `MutationObserver` re-runs the scan when the page changes (infinite feeds, SPAs). Requests are rate-limited to one every 3 seconds.
3. **Analyze**: the backend asks `gpt-4o-mini` (through OpenRouter) to act as a strict fact-checker. It enforces a JSON schema and gets back a list of suspicious phrases, each with an `aiVerdict` (true/false) and a `credibility` score from 0 to 10.
4. **Source**: for every flagged phrase, the backend queries the Serper (Google Search) API and attaches the top 3 result links.
5. **Highlight**: the extension wraps each phrase in a `<mark>`. Hovering it shows the phrase, the related sources, and TRUE / FALSE buttons. After you vote, the card reveals the AI verdict and credibility score.

---

## Tech stack

| Layer | Technology |
|---|---|
| Extension | Chrome Extension **Manifest V3**, vanilla JavaScript, content script + service worker |
| Backend | **Node.js**, **Express 5**, `cors`, `body-parser`, `dotenv`, `node-fetch` |
| AI | `openai` SDK pointed at **OpenRouter**, model `gpt-4o-mini`, JSON-schema structured output |
| Search | **Serper** Google Search API |

---

## Project structure

```text
TUO-Unesco/
├── backend/
│   ├── server.js        # Express server: POST /analyze → LLM fact-check + Serper sources
│   ├── package.json
│   └── .env             # OPENROUTER_API_KEY, SERPER_API_KEY
└── extension/
    ├── manifest.json    # MV3 manifest (content script on all URLs, localhost host permission)
    ├── content.js       # Scraping, change detection, highlighting, tooltip UI
    ├── background.js    # Service worker that relays analyze requests to the backend
    └── duckduckgo.js    # Experimental DuckDuckGo search helper (not wired in yet)
```

---

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- Google Chrome (or another Chromium browser)
- An [OpenRouter](https://openrouter.ai/) API key
- A [Serper](https://serper.dev/) API key

### 1. Run the backend

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
OPENROUTER_API_KEY=your_openrouter_key
SERPER_API_KEY=your_serper_key
```

Then start the server:

```bash
npm start
# Server running on http://localhost:3000
```

### 2. Load the extension

1. Open `chrome://extensions`.
2. Turn on **Developer mode** (top right).
3. Click **Load unpacked** and select the `extension/` folder.
4. Visit any article. Suspicious phrases will be highlighted after a few seconds.

> To use TUO on local `file://` pages, open the extension's details in `chrome://extensions` and enable **Allow access to file URLs**.

---

## API

### `POST /analyze`

**Request**

```json
{ "content": "Text scraped from the page..." }
```

**Response**

```json
{
  "suspiciousPhrases": [
    {
      "phrase": "The statement that was flagged",
      "aiVerdict": false,
      "credibility": 2,
      "sources": [
        "https://example.org/result-1",
        "https://example.org/result-2",
        "https://example.org/result-3"
      ]
    }
  ]
}
```

---

## Limitations & privacy

- **Local only**: the extension calls `http://localhost:3000`, so the backend must be running on the same machine.
- **Third-party processing**: page text is sent to OpenRouter and flagged phrases are sent to Serper. Avoid using TUO on pages with private or sensitive information.
- **AI verdicts can be wrong**: treat the highlights as prompts to check sources, not as final answers. That's why TUO asks for your verdict first.
- **Prototype**: the DuckDuckGo helper and the `links` field sent by the content script aren't used by the backend yet.

---

## Roadmap ideas

- Feed the retrieved sources back into the model so verdicts are grounded in evidence.
- Use the DuckDuckGo helper as a free fallback when no Serper key is set.
- Add a popup with on/off toggle and per-site allowlist.
- Store user verdicts to measure how often people agree with the AI.
