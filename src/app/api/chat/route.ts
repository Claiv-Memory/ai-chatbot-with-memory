import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { ClaivClient } from '@claiv/memory';

const claiv = new ClaivClient({ apiKey: process.env.CLAIV_API_KEY! });

export async function POST(req: Request) {
  const { messages, userId = 'default_user', conversationId = 'default_conv' } = await req.json();
  const userMessage = messages.at(-1)?.content ?? '';

  // Recall what CLAIV knows about this user
  const memory = await claiv.recall({
    user_id: userId,
    conversation_id: conversationId,
    query: userMessage,
  });

  const systemPrompt = memory.llm_context.text
    ? `You are a helpful assistant that remembers users. User context:\n${memory.llm_context.text}`
    : 'You are a helpful assistant.';

  const result = streamText({
    model: openai('gpt-4o'),
    system: systemPrompt,
    messages,
    async onFinish({ text }) {
      // Store both turns after the response
      await Promise.all([
        claiv.ingest({ user_id: userId, conversation_id: conversationId,
          type: 'message', role: 'user', content: userMessage }),
        claiv.ingest({ user_id: userId, conversation_id: conversationId,
          type: 'message', role: 'assistant', content: text }),
      ]);
    },
  });

  return result.toDataStreamResponse();
}
