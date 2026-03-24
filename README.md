# AI Chatbot with Memory (OpenAI + Next.js)

> A working AI chatbot that remembers users across sessions.
> OpenAI GPT-4o + persistent memory. Clone and deploy in 5 minutes.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Claiv-Memory/ai-chatbot-with-memory)

👉 **Want to add memory to your own app?** See [CLAIV Memory](https://github.com/Claiv-Memory/claiv-memory) — the memory API powering this chatbot.

**Without memory:**
```
User:  My name is Alex and I run a fitness business.
...next session...
AI:    How can I help you today?
```

**With memory:**
```
AI:    How is your fitness business going, Alex?
```

This is a full, working chatbot that remembers users using [CLAIV Memory](https://claiv.io) — not chat history, not a vector database, but structured persistent memory that works across sessions.

## What makes this different from other chatbot starters

Most chatbot starters use chat history or session state. That means:
- The AI forgets everything when the session ends
- Long conversations hit token limits and get truncated
- Users have to repeat themselves

This chatbot uses **persistent memory**:
- Facts are extracted and stored after each turn
- Memory survives across sessions, devices, and restarts
- Only relevant context is injected — no token waste

## Quickstart

```bash
git clone https://github.com/Claiv-Memory/ai-chatbot-with-memory
cd ai-chatbot-with-memory
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

## Environment variables

```
OPENAI_API_KEY=   # from platform.openai.com
CLAIV_API_KEY=    # from claiv.io
```

## How the memory works

```
User sends message
      ↓
GET /api/chat
      ↓
claiv.recall() — fetch what CLAIV knows about this user
      ↓
Inject memory.llm_context.text into system prompt
      ↓
OpenAI GPT-4o streams the response
      ↓
claiv.ingest() — store both turns for next time
```

The key file is `src/app/api/chat/route.ts` — under 40 lines.

## Stack

- [Next.js 14](https://nextjs.org) — React framework
- [Vercel AI SDK](https://sdk.vercel.ai) — streaming UI
- [OpenAI GPT-4o](https://openai.com) — language model
- [CLAIV Memory](https://claiv.io) — persistent memory layer

## Deploy

One click with Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Claiv-Memory/ai-chatbot-with-memory)

Set `OPENAI_API_KEY` and `CLAIV_API_KEY` in the Vercel dashboard.

## Want to add document memory?

See [template-document-rag-nextjs](https://github.com/Claiv-Memory/template-document-rag-nextjs) — adds drag-and-drop document upload so your AI can answer questions about uploaded files.

## More templates

- [template-openai-nodejs](https://github.com/Claiv-Memory/template-openai-nodejs) — plain Node.js
- [template-openai-python](https://github.com/Claiv-Memory/template-openai-python) — Python
- [template-langchain](https://github.com/Claiv-Memory/template-langchain) — LangChain
- [claiv-memory](https://github.com/Claiv-Memory/claiv-memory) — all examples

---

Keywords: ai chatbot with memory, chatbot that remembers users, openai chatbot persistent memory, nextjs ai chatbot, chatbot long term memory, ai that remembers, llm memory, chatbot context across sessions, openai memory nextjs
