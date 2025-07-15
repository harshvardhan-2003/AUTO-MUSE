import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

const ai = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY!);


const generationConfig = {
  temperature: 0.7,
  topK: 1,
  topP: 1,
  maxOutputTokens: 1000,
  responseMimeType: 'text/plain',
};

const model = ai.getGenerativeModel({ model: 'gemini-1.5-flash' });

export const createChatSession = async () => {
  const chatSession = await model.startChat({
    generationConfig,
    history: [],
  });
  return chatSession;
};
