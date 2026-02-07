
import { GoogleGenAI, Type } from "@google/genai";
import { GeminiAnalysisResult } from "../types";

export const analyzeModelReadiness = async (modelDescription: string): Promise<GeminiAnalysisResult> => {
  // Use process.env.API_KEY directly when initializing as per guidelines.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze the following AI model description for deployment readiness and safety: "${modelDescription}"`,
    config: {
      systemInstruction: `You are Green Flag AI's lead assurance engine. Your goal is to evaluate if an AI system is safe to go live. 
      Analyze for: Bias, Security, Compliance (EU AI Act, NIST), and Business Risk.
      Return a structured JSON evaluation.`,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.NUMBER, description: "A score from 0-100 where 100 is perfectly safe." },
          risks: { type: Type.ARRAY, items: { type: Type.STRING } },
          recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
          complianceGap: { type: Type.ARRAY, items: { type: Type.STRING } },
          goLiveDecision: { type: Type.STRING, description: "One of: GO, CAUTION, or NO-GO." }
        },
        required: ["score", "risks", "recommendations", "complianceGap", "goLiveDecision"]
      }
    }
  });

  // response.text is a property, do not call it as a method.
  const resultText = response.text;
  if (!resultText) {
    throw new Error("Analysis failed to produce content.");
  }
  return JSON.parse(resultText.trim()) as GeminiAnalysisResult;
};
