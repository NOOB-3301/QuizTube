import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateWorkspace(subtitles, type, count) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  
  // Limit subtitles to ~100,000 characters to be safe
  const truncatedSubtitles = subtitles.length > 100000 
    ? subtitles.substring(0, 100000)
    : subtitles;

  let prompt;
  
  switch(type) {
    case 'mcq':
      prompt = `Create ${count} multiple choice questions based on the following content. 
Each question should have one correct answer and three incorrect answers.
IMPORTANT: Respond ONLY with a JSON object containing an array of questions.
Format: {
  "questions": [
    {
      "question": "What is the capital of France?",
      "options": ["Paris", "London", "Berlin", "Madrid"],
      "correctIndex": 0
    }
  ]
}
Content: ${truncatedSubtitles}`;
      break;
      
    case 'long-answer':
      prompt = `Create ${count} long answer questions based on the following content.
IMPORTANT: Respond ONLY with a JSON object containing an array of questions and their answer within 100 words.
Format: {
  "questions": [
    {
      "question": "Explain the concept of...",
      "answer": ""
    }
  ]
}
Content: ${truncatedSubtitles}`;
      break;
      
    case 'summarize':
      prompt = `Summarize the following content in approximately ${count} words.
IMPORTANT: Respond ONLY with a JSON object containing the summary.
Format: {
  "summary": "The content discusses..."
}
Content: ${truncatedSubtitles}`;
      break;
  }

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();
    
    const cleanJson = text.replace(/^\`\`\`json\s*/, '').replace(/\`\`\`\s*$/, '');
    
    try {
      return JSON.parse(cleanJson);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      console.error('Raw Response:', text);
      console.error('Cleaned Response:', cleanJson);
      throw new Error('Failed to parse response');
    }
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw error;
  }
}
