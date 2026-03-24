'use client';

import { useChat } from 'ai/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    body: { userId: 'user_demo', conversationId: 'chat_demo' },
  });

  return (
    <main style={{ maxWidth: 640, margin: '60px auto', padding: '0 20px', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>AI Chatbot with Memory</h1>
      <p style={{ color: '#666', fontSize: 14, marginBottom: 24 }}>
        This chatbot remembers you across sessions using CLAIV Memory.
      </p>

      <div style={{ border: '1px solid #e5e7eb', borderRadius: 8, minHeight: 400, padding: 16, marginBottom: 16, background: '#fafafa' }}>
        {messages.length === 0 && (
          <p style={{ color: '#9ca3af', fontSize: 14 }}>Start a conversation. Come back later — it will remember you.</p>
        )}
        {messages.map((m) => (
          <div key={m.id} style={{ marginBottom: 12 }}>
            <span style={{ fontWeight: 600, fontSize: 13, color: m.role === 'user' ? '#2563eb' : '#059669' }}>
              {m.role === 'user' ? 'You' : 'AI'}
            </span>
            <p style={{ margin: '4px 0 0', fontSize: 14, lineHeight: 1.5 }}>{m.content}</p>
          </div>
        ))}
        {isLoading && <p style={{ color: '#9ca3af', fontSize: 13 }}>Thinking...</p>}
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8 }}>
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Say something..."
          style={{ flex: 1, padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 14 }}
        />
        <button
          type="submit"
          disabled={isLoading || !input}
          style={{ padding: '8px 16px', background: '#2563eb', color: 'white', border: 'none', borderRadius: 6, fontSize: 14, cursor: 'pointer' }}
        >
          Send
        </button>
      </form>
    </main>
  );
}
