import { GoogleGenAI } from "@google/genai";
import { Question, Grade, Subject } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const TOTAL_QUESTIONS = 20;

export async function generateTestQuestions(
  grade: Grade,
  subjectName: string,
  topic: string
): Promise<Question[]> {
    const systemInstruction = `You are an expert academic content creator specializing in Olympiad-style exams for young students.
Your task is to generate a set of multiple-choice questions (MCQs) for a mock test.
The output MUST be a single, valid JSON array of question objects. Do not wrap it in other keys or add any explanatory text.
Each object in the array must have these exact keys:
- "question": A string containing the question text.
- "options": An array of four unique strings representing the possible answers.
- "answerIndex": A number from 0 to 3, representing the index of the correct answer in the "options" array.
- "explanation": A clear, step-by-step explanation for the correct answer. IMPORTANT: For the JSON to be valid, all newlines in this string MUST be escaped as \\n, and any double quotes within the text MUST be escaped as \\".`;

    const userPrompt = `Generate ${TOTAL_QUESTIONS} questions for a mock test with the following details:
- Grade Level: ${grade}
- Subject: ${subjectName}
- Topic: ${topic}
- Question Style: The questions should be suitable for the specified grade level, testing conceptual understanding and application, similar to Science Olympiad Foundation (SOF) exams.`;
    
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-04-17",
            contents: userPrompt,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                temperature: 0.7,
            },
        });
        
        let jsonStr = response.text.trim();
        const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
        const match = jsonStr.match(fenceRegex);
        if (match && match[2]) {
          jsonStr = match[2].trim();
        }

        let parsedData = JSON.parse(jsonStr);

        // In case the model wraps the array in an object, e.g., { "questions": [...] }
        if (!Array.isArray(parsedData) && typeof parsedData === 'object' && parsedData !== null) {
            const key = Object.keys(parsedData).find(k => Array.isArray((parsedData as any)[k]));
            if (key) {
                parsedData = (parsedData as any)[key];
            }
        }

        // Basic validation on the final data structure
        if (Array.isArray(parsedData) && parsedData.length > 0 && 'question' in parsedData[0] && 'options' in parsedData[0] && 'answerIndex' in parsedData[0]) {
             return parsedData.slice(0, TOTAL_QUESTIONS);
        } else {
            console.error("Parsed data is not in the expected array format:", parsedData);
            throw new Error("The AI returned data in an unexpected format. Please try again.");
        }

    } catch (error) {
        console.error("Failed to generate test questions:", error);
        if (error instanceof SyntaxError) {
             throw new Error("Could not understand the AI's response (invalid JSON). Please try again.");
        }
        if (error instanceof Error) {
            // Forward our custom validation error message
            if(error.message.includes("The AI returned data")) {
                throw error;
            }
        }
        throw new Error("Could not generate the test due to an AI or network issue. Please try again later.");
    }
}


export async function generateExplanation(question: Question, grade: Grade): Promise<string> {
    const systemInstruction = `You are an expert teacher who excels at explaining complex topics to young students.
Your task is to provide a clear, step-by-step explanation for the solution to a given multiple-choice question.
The explanation should be easy for a student in Grade ${grade} to understand.
Break down the solution into logical steps. Use newline characters (\\n) to separate steps for readability.`;
    
    const userPrompt = `Here is the question:
Question: "${question.question}"
Options:
A: "${question.options[0]}"
B: "${question.options[1]}"
C: "${question.options[2]}"
D: "${question.options[3]}"

The correct answer is: "${question.options[question.answerIndex]}"

Please provide a step-by-step explanation for why this is the correct answer.`;
    
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-04-17",
            contents: userPrompt,
            config: {
                systemInstruction: systemInstruction,
                temperature: 0.5,
            },
        });
        
        return response.text.trim();

    } catch (error) {
        console.error("Failed to generate explanation:", error);
        throw new Error("Could not generate an explanation due to an AI or network issue.");
    }
}