"""
Portfolio AI Chat Backend
Flask + SQLite + OpenRouter (free model)
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import requests
import json
import uuid
import os
from datetime import datetime

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173", "http://localhost:3000", "*"])

# ─── CONFIG ──────────────────────────────────────────────
OPENROUTER_API_KEY = os.environ.get("OPENROUTER_API_KEY", "YOUR_OPENROUTER_API_KEY_HERE")
OPENROUTER_MODEL   = "mistralai/mistral-7b-instruct:free"   # free model
DB_PATH            = "portfolio_chat.db"

# ─── RESUME CONTEXT ──────────────────────────────────────
RESUME_CONTEXT = """
You are an AI assistant embedded in Snehal Golait's personal portfolio website.
Answer questions about Snehal professionally and helpfully.
Only answer based on the information below. If you don't know something, say so politely.

=== ABOUT SNEHAL GOLAIT ===
Name: Snehal Golait
Location: Dhule, Maharashtra, India
Email: golaitsnehal03@gmail.com
Phone: +91-9665810281
GitHub: https://github.com/Snehal-Golait
LinkedIn: https://www.linkedin.com/in/snehal-golait

=== EDUCATION ===
- B.Tech in Information Technology
- SVKM's Institute of Technology, Dhule (DBATU University)
- Duration: December 2022 – June 2026
- CGPA: 8.01 / 10

=== PROFESSIONAL SUMMARY ===
Final-year B.Tech IT student with hands-on experience across the full software development lifecycle.
Builds scalable, API-driven web applications, REST APIs, and databases with working knowledge of AWS.
Motivated to work across front-end, back-end, and infrastructure layers.
Actively leverages AI tools to improve development, testing, and debugging efficiency.

=== TECHNICAL SKILLS ===
Programming Languages: Python, C, C++, Java, PHP (Introductory)
Frontend Technologies: HTML5, CSS3, Bootstrap, JavaScript, React (Basic)
Backend & Databases: Flask, Django, Node.JS, REST APIs, MySQL, MongoDB
Machine Learning & AI: CNNs, Deep Learning, ML Algorithms, TensorFlow, OpenCV, LLMs
Tools & Platforms: Git, GitHub, AWS (EC2, S3), VS Code
Core Concepts: OOP, DSA, SDLC, Debugging & Testing

=== PROJECTS ===

1. FractureNetPlus – AI-Based Fracture Detection Web Application
   Period: September 2025 – November 2025
   Tech Stack: Python, MySQL, CNN, TensorFlow, OpenCV, Flask
   GitHub: https://github.com/Snehal-Golait
   Description:
   - Contributed across the entire development lifecycle (requirement analysis to deployment)
   - Designed and implemented RESTful APIs for data ingestion, processing, and result delivery
   - Integrated backend services with a responsive frontend interface
   - Worked on backend logic, database handling, and debugging workflows
   - Used AI-assisted tools to accelerate debugging, code refactoring, and documentation

2. Alumni Association Platform
   Period: September 2024 – December 2024
   Tech Stack: HTML, CSS, JavaScript, Node.JS, MySQL
   GitHub: https://github.com/Snehal-Golait/alumni-association-platform
   Description:
   - Designed and developed responsive web pages using HTML and CSS
   - Built backend services for user management, events, and job postings using REST APIs
   - Integrated MySQL database for persistent data storage and retrieval
   - Followed SDLC best practices including code reviews, testing, and incremental releases
   - Used GitHub for version control and collaboration

=== INTERNSHIP ===
Role: IoT Intern
Company: Smart Logic Technologies
Period: September 2023 – November 2023
Responsibilities:
- Worked with real-time data streams from IoT sensors for data acquisition and analysis
- Analyzed system data to detect anomalies and improve reliability
- Supported backend logic and data pipelines
- Strengthened data analysis and problem-solving skills relevant to AI workflows

=== CERTIFICATIONS ===
1. NPTEL (SWAYAM): Joy of Computing Using Python
2. Infosys Springboard: Web Development Fundamentals

=== POSITIONS OF RESPONSIBILITY ===
- Member, ACM Student Chapter
- Student Member, ISTE

=== INTERESTS & HOBBIES ===
- Reading Books
- Painting

=== AVAILABILITY ===
Snehal is actively looking for internship and full-time opportunities in:
- Full Stack Development
- AI/ML Engineering
- Backend Development
- Software Engineering roles

Feel free to ask about any of the above topics!
"""

# ─── DATABASE SETUP ──────────────────────────────────────
def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("""
        CREATE TABLE IF NOT EXISTS chat_sessions (
            id TEXT PRIMARY KEY,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL
        )
    """)
    c.execute("""
        CREATE TABLE IF NOT EXISTS chat_messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            session_id TEXT NOT NULL,
            role TEXT NOT NULL,
            content TEXT NOT NULL,
            created_at TEXT NOT NULL,
            FOREIGN KEY (session_id) REFERENCES chat_sessions(id)
        )
    """)
    conn.commit()
    conn.close()

def get_session_messages(session_id: str) -> list:
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute(
        "SELECT role, content FROM chat_messages WHERE session_id=? ORDER BY id ASC",
        (session_id,)
    )
    rows = c.fetchall()
    conn.close()
    return [{"role": r[0], "content": r[1]} for r in rows]

def save_message(session_id: str, role: str, content: str):
    now = datetime.utcnow().isoformat()
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    # Ensure session exists
    c.execute("INSERT OR IGNORE INTO chat_sessions VALUES (?,?,?)", (session_id, now, now))
    c.execute(
        "INSERT INTO chat_messages (session_id, role, content, created_at) VALUES (?,?,?,?)",
        (session_id, role, content, now)
    )
    c.execute("UPDATE chat_sessions SET updated_at=? WHERE id=?", (now, session_id))
    conn.commit()
    conn.close()

# ─── ROUTES ──────────────────────────────────────────────

@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "model": OPENROUTER_MODEL})

@app.route("/api/session", methods=["POST"])
def create_session():
    session_id = str(uuid.uuid4())
    now = datetime.utcnow().isoformat()
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("INSERT INTO chat_sessions VALUES (?,?,?)", (session_id, now, now))
    conn.commit()
    conn.close()
    return jsonify({"session_id": session_id})

@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json()
    session_id = data.get("session_id")
    user_message = data.get("message", "").strip()

    if not session_id or not user_message:
        return jsonify({"error": "session_id and message are required"}), 400

    # Save user message
    save_message(session_id, "user", user_message)

    # Retrieve conversation history (last 10 messages for context window)
    history = get_session_messages(session_id)[-10:]

    # Build messages for OpenRouter
    messages = [
        {"role": "system", "content": RESUME_CONTEXT},
        *history
    ]

    try:
        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                "Content-Type": "application/json",
                "HTTP-Referer": "https://snehal-golait.portfolio.com",
                "X-Title": "Snehal Golait Portfolio",
            },
            json={
                "model": OPENROUTER_MODEL,
                "messages": messages,
                "max_tokens": 512,
                "temperature": 0.7,
            },
            timeout=30
        )
        response.raise_for_status()
        result = response.json()
        ai_reply = result["choices"][0]["message"]["content"]
    except requests.exceptions.RequestException as e:
        # Fallback: generate a local response using the resume context
        ai_reply = generate_fallback_response(user_message)

    # Save AI message
    save_message(session_id, "assistant", ai_reply)

    return jsonify({
        "reply": ai_reply,
        "session_id": session_id
    })

@app.route("/api/chat/history/<session_id>", methods=["GET"])
def get_history(session_id):
    messages = get_session_messages(session_id)
    return jsonify({"messages": messages, "session_id": session_id})

@app.route("/api/suggestions", methods=["GET"])
def suggestions():
    return jsonify({
        "suggestions": [
            "What tech stack does Snehal use?",
            "Tell me about FractureNetPlus project",
            "What is Snehal's CGPA?",
            "Is Snehal available for internships?",
            "What AI/ML skills does Snehal have?",
            "Tell me about the Alumni Platform project",
            "What certifications does Snehal hold?",
        ]
    })

def generate_fallback_response(message: str) -> str:
    """Local keyword-based fallback if OpenRouter is unavailable."""
    m = message.lower()
    if any(x in m for x in ["project", "fracture", "alumni", "built"]):
        return (
            "Snehal has built two major projects:\n\n"
            "1. **FractureNetPlus** (Sept–Nov 2025) – An AI-powered fracture detection web app using CNN + TensorFlow + Flask. It includes REST APIs for data ingestion and a responsive frontend.\n\n"
            "2. **Alumni Association Platform** (Sept–Dec 2024) – A full-stack platform for college alumni using Node.js, MySQL, and REST APIs, featuring user management, events, and job postings.\n\n"
            "You can explore both on GitHub: github.com/Snehal-Golait"
        )
    elif any(x in m for x in ["skill", "tech", "stack", "language", "framework"]):
        return (
            "Snehal's technical skills span:\n\n"
            "• **Languages**: Python, C, C++, Java, PHP, JavaScript\n"
            "• **Frontend**: HTML5, CSS3, Bootstrap, React\n"
            "• **Backend**: Flask, Django, Node.js, REST APIs\n"
            "• **Databases**: MySQL, MongoDB\n"
            "• **AI/ML**: TensorFlow, CNNs, OpenCV, LLMs\n"
            "• **Cloud**: AWS EC2, S3\n"
            "• **Tools**: Git, GitHub, VS Code"
        )
    elif any(x in m for x in ["cgpa", "grade", "gpa", "score", "education", "degree", "college", "university"]):
        return (
            "Snehal is pursuing a **B.Tech in Information Technology** at SVKM's Institute of Technology, Dhule (DBATU University), graduating in June 2026, "
            "with a CGPA of **8.01 / 10**."
        )
    elif any(x in m for x in ["intern", "experience", "work", "job"]):
        return (
            "Snehal completed an **IoT Internship** at Smart Logic Technologies (Sept–Nov 2023), "
            "working with real-time sensor data streams, anomaly detection, and backend data pipelines. "
            "Snehal is currently open to new internship and full-time opportunities!"
        )
    elif any(x in m for x in ["contact", "email", "reach", "hire", "available"]):
        return (
            "You can reach Snehal at:\n\n"
            "📧 golaitsnehal03@gmail.com\n"
            "📱 +91-9665810281\n"
            "🐙 github.com/Snehal-Golait\n"
            "💼 linkedin.com/in/snehal-golait\n\n"
            "Snehal is actively looking for roles in Fullstack Dev, AI/ML Engineering, and Backend Development!"
        )
    else:
        return (
            "Hi! I'm Snehal's AI assistant. I can tell you about:\n\n"
            "• 🎓 Education & CGPA\n"
            "• 💻 Technical skills & projects\n"
            "• 🏢 Internship experience\n"
            "• 📜 Certifications\n"
            "• 📬 Contact & availability\n\n"
            "What would you like to know?"
        )

# ─── MAIN ────────────────────────────────────────────────
if __name__ == "__main__":
    init_db()
    print("✅ Portfolio AI Chat Backend running on http://localhost:8000")
    print(f"✅ Using model: {OPENROUTER_MODEL}")
    app.run(host="0.0.0.0", port=8000, debug=True)
