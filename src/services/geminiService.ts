// import { GoogleGenAI } from "@google/genai";

// // Note: In a real environment, this would use process.env.API_KEY
// // For this demo structure, we assume the environment is set up correctly.
// const apiKey = process.env.API_KEY || ''; 

// let ai: GoogleGenAI | null = null;

// if (apiKey) {
//   ai = new GoogleGenAI({ apiKey });
// }

// export const generatePageContent = async (topic: string): Promise<string> => {
//   if (!ai) {
//     console.warn("Gemini API Key not found. Returning mock data.");
//     return "This is simulated AI content because no API key was configured. Please configure the API key to generate real content about: " + topic;
//   }

//   try {
//     const response = await ai.models.generateContent({
//       model: 'gemini-2.5-flash',
//       contents: `Generate a short, engaging marketing paragraph for a landing page about: ${topic}. Keep it under 50 words.`,
//     });
//     return response.text || "No content generated.";
//   } catch (error) {
//     console.error("Gemini API Error:", error);
//     return "Error generating content. Please try again.";
//   }
// };
