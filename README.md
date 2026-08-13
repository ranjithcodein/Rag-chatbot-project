# RAG Document Q&A Chatbot

Upload a PDF and ask natural-language questions grounded in its content, with
per-user accounts and persistent chat history.

## Tools used

- **Frontend:** React (Vite), Tailwind CSS
- **Backend:** Flask, JWT auth
- **AI pipeline:** LangChain, OpenAI Embeddings + Chat API
- **Vector store:** ChromaDB
- **Relational database:** MySQL (users, documents, chat history)

## Project structure

```
rag-chatbot-project/
├── backend/
│   ├── app.py              # Flask server: auth + upload + chat routes
│   ├── schema.sql          # MySQL tables
│   ├── requirements.txt
│   └── .env.example
└── frontend/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── index.css
        └── components/
            ├── Login.jsx
            ├── Signup.jsx
            └── RagChatInterface.jsx
```

## Setup

### 1. Database
```bash
mysql -u root -p < backend/schema.sql
```

### 2. Backend
```bash
cd backend
cp .env.example .env   # fill in your real OpenAI key, DB password, JWT secret
pip install -r requirements.txt
export $(cat .env | xargs)   # loads .env vars into your shell (macOS/Linux)
python app.py
```
Runs at `http://localhost:5000`.

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```
Runs at `http://localhost:3000`.

## How it works

1. User signs up / logs in → receives a JWT token.
2. User uploads a PDF → Flask extracts text (LangChain `PyPDFLoader`), splits
   it into chunks, embeds each chunk (OpenAI Embeddings), and stores the
   vectors in ChromaDB. The document's metadata is saved in MySQL.
3. User asks a question → the question is embedded, ChromaDB returns the most
   similar chunks, and those are passed to the OpenAI chat model as context
   for a grounded answer.
4. Both the question and answer are saved to MySQL so the conversation
   persists across sessions.
