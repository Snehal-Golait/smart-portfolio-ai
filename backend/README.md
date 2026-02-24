# Portfolio AI Chat — Backend

## Setup

```bash
cd backend
pip install -r requirements.txt
```

## Configure OpenRouter API Key

Get a free API key from https://openrouter.ai/keys

**Option 1 – Environment variable (recommended):**
```bash
export OPENROUTER_API_KEY=sk-or-xxxxxxxxxxxx
python app.py
```

**Option 2 – Edit app.py:**
```python
OPENROUTER_API_KEY = "sk-or-xxxxxxxxxxxx"
```

## Run

```bash
python app.py
# Runs on http://localhost:8000
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/health | Health check |
| POST | /api/session | Create chat session |
| POST | /api/chat | Send a message |
| GET | /api/chat/history/:session_id | Get chat history |
| GET | /api/suggestions | Get suggested questions |

## Notes
- Uses SQLite (`portfolio_chat.db`) — no external DB setup needed
- Model: `mistralai/mistral-7b-instruct:free` (free tier on OpenRouter)
- Falls back to keyword-based responses if OpenRouter is unavailable
