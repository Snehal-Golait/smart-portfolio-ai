# 🚀 Snehal Golait — AI-Powered Portfolio

A full-stack personal portfolio with an embedded **AI chat assistant** that answers questions about Snehal's resume, skills, and projects in real-time.

## Tech Stack

| Layer | Tech |
|-------|------|
| **Frontend** | React 18 + TypeScript + Vite |
| **Backend** | Python + Flask |
| **Database** | SQLite (via built-in `sqlite3`) |
| **AI Engine** | OpenRouter API — `mistralai/mistral-7b-instruct:free` |
| **Styling** | Pure CSS-in-JS (no external UI lib needed) |

---

## Project Structure

```
portfolio/
├── backend/
│   ├── app.py              # Flask server + OpenRouter integration
│   ├── requirements.txt    # Python dependencies
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── App.tsx         # Root component
│   │   ├── components/
│   │   │   ├── ChatWidget.tsx   # AI chat floating widget
│   │   │   ├── Navbar.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── Projects.tsx
│   │   │   └── Sections.tsx    # About, Experience, Contact, Footer
│   │   ├── hooks/
│   │   │   └── index.ts        # useChat + useParticles hooks
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
└── README.md
```

---

## ⚡ Quick Start

### Step 1 — Get OpenRouter API Key (FREE)

1. Go to **https://openrouter.ai** and create an account
2. Navigate to **https://openrouter.ai/keys**
3. Click **Create Key** → Copy your API key (starts with `sk-or-...`)
4. The model used is `mistralai/mistral-7b-instruct:free` — **completely free**, no credit card needed

---

### Step 2 — Start the Backend

```bash
cd backend

# Install dependencies
pip install -r requirements.txt

# Set your OpenRouter API key
export OPENROUTER_API_KEY=sk-or-your-key-here   # Linux/Mac
# OR
set OPENROUTER_API_KEY=sk-or-your-key-here       # Windows CMD

# Start the server
python app.py
```

> ✅ Backend runs at **http://localhost:8000**  
> ✅ SQLite DB (`portfolio_chat.db`) is created automatically

**Without an API key:** The backend has a built-in keyword-based fallback — it still works, just without the LLM. Great for testing!

---

### Step 3 — Start the Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

> ✅ Frontend runs at **http://localhost:5173**  
> ✅ Vite automatically proxies `/api/*` requests to the backend

---

## 🤖 AI Chat Features

- **Floating chat button** (bottom-right) — click the 🤖 robot button
- **Suggested questions** shown on first open
- **Full conversation history** stored in SQLite per session
- **Markdown rendering** — bold, italic, code, lists all render nicely
- **Typing indicator** while waiting for AI response
- **Fallback responses** if backend is unreachable

### Example Questions
- "What is Snehal's CGPA?"
- "Tell me about FractureNetPlus"
- "What AI/ML skills does Snehal have?"
- "Is Snehal available for internships?"
- "How can I contact Snehal?"

---

## Backend API Reference

```
GET  /api/health                    Health check
POST /api/session                   Create new chat session → { session_id }
POST /api/chat                      Send message → { reply, session_id }
     Body: { session_id, message }
GET  /api/chat/history/:session_id  Get full chat history
GET  /api/suggestions               Get suggested questions
```

---

## 🛠️ Customization

### Update resume content
Edit the `RESUME_CONTEXT` string in `backend/app.py` — this is the knowledge base the AI uses.

### Change AI model
Edit `OPENROUTER_MODEL` in `backend/app.py`. Browse free models at https://openrouter.ai/models?q=free

### Add new projects
Edit the `PROJECTS` array in `frontend/src/components/Projects.tsx`

### Update social links
Edit `frontend/src/components/Sections.tsx` → Contact section

---

## Production Build

```bash
# Build frontend
cd frontend && npm run build

# Serve with Flask (add static folder config) or deploy to Vercel/Netlify
# Run backend on a VPS/Railway/Render
```

---

## 📦 Dependencies

**Backend:**
- `flask` — web framework
- `flask-cors` — cross-origin requests
- `requests` — HTTP client for OpenRouter

**Frontend:**
- `react` + `react-dom` — UI framework
- `typescript` — type safety
- `vite` — build tool + dev server
- `lucide-react` — icons (optional)

---

Made with ❤️ by Snehal Golait · 2026
