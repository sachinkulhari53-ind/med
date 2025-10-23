
import { GoogleGenAI, Type } from '@google/genai';
import type { PatientInfo, AnalysisResult } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    suspectedCondition: {
      type: Type.STRING,
      description: 'The most likely medical condition based on the inputs.'
    },
    medications: {
      type: Type.ARRAY,
      description: 'An analysis of each medication from the prescription.',
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: 'Name of the medication.' },
          purpose: { type: Type.STRING, description: 'The purpose of this medication for the suspected condition.' },
          isFastActing: { type: Type.BOOLEAN, description: 'Whether the medication is generally considered fast-acting for the described symptoms.' }
        },
        required: ['name', 'purpose', 'isFastActing']
      }
    },
    recommendation: {
      type: Type.STRING,
      description: 'A clear, concise recommendation, such as "Urgent hospitalization recommended," "Follow-up with a doctor is advised," or "Continue treatment as prescribed."'
    },
    detailedExplanation: {
      type: Type.STRING,
      description: 'A paragraph explaining the reasoning behind the suspected condition and recommendations.'
    }
  },
  required: ['suspectedCondition', 'medications', 'recommendation', 'detailedExplanation']
};


export const getMedicalAnalysis = async (patientInfo: PatientInfo): Promise<AnalysisResult> => {
  const prompt = `
    You are an advanced AI assistant for medical students and public awareness, specializing in analyzing patient information.
    Based ONLY on the provided details, perform a detailed analysis.

    **IMPORTANT**: Do not provide medical advice. Your purpose is to educate and organize the given information. Do not invent information not present in the input.

    Patient Information:
    - Age: ${patientInfo.age}
    - Sex: ${patientInfo.sex}
    - Primary Symptoms: ${patientInfo.symptoms}
    - Doctor's Prescription Details: ${patientInfo.prescription}
    - Known Allergies: ${patientInfo.allergies || 'None provided'}

    Tasks:
    1.  **Identify Condition**: Based on the symptoms and prescribed medications, identify the most probable condition.
    2.  **Analyze Medications**: For each medication listed, explain its role in treating the identified condition and determine if it's considered fast-acting.
    3.  **Formulate Recommendation**: Based on the severity implied by the symptoms and prescription, provide a clear recommendation (e.g., about hospitalization or follow-up).
    4.  **Provide Explanation**: Briefly explain the connection between the symptoms, condition, and treatment approach.

    Generate a response strictly in the following JSON format.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
        temperature: 0.2,
      },
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    return result as AnalysisResult;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error && error.message.includes('JSON')) {
        throw new Error('Failed to get a valid analysis from the AI. The response was not in the expected format.');
    }
    throw new Error('An error occurred while communicating with the AI. Please try again.');
  }
};
