
interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface OpenAIResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

export const sendMessageToAI = async (
  messages: ChatMessage[],
  apiKey: string
): Promise<string> => {
  if (!apiKey) {
    throw new Error('OpenAI API key is required');
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4.1-2025-04-14',
      messages: messages,
      temperature: 0.7,
      max_tokens: 1000,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to get AI response');
  }

  const data: OpenAIResponse = await response.json();
  return data.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
};
