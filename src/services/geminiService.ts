import { GoogleGenAI } from "@google/genai";
import { DEPARTMENTS, DOCTORS, SERVICES, HEALTH_PACKAGES } from "../data";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.warn("Missing VITE_GEMINI_API_KEY");
}

const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

const SYSTEM_PROMPT = `
You are "MediCare AI Assistant", an intelligent and helpful virtual assistant for MediCare Plus clinic.

Your goal is to assist users with:
- Clinic services
- Doctors
- Fees
- Timings
- Location
- Health packages
- Appointment booking

CLINIC INFO:
- Location: Main Road, Arera Colony, Bhopal, MP - 462001
- Timing: Mon-Fri 9:00 AM - 8:00 PM
- Sat: 9:00 AM - 6:00 PM
- Sunday: Emergency Only
- Phone: +91 98765 43210

DEPARTMENTS:
${JSON.stringify(DEPARTMENTS, null, 2)}

DOCTORS:
${JSON.stringify(DOCTORS, null, 2)}

SERVICES:
${JSON.stringify(SERVICES, null, 2)}

HEALTH PACKAGES:
${JSON.stringify(HEALTH_PACKAGES, null, 2)}

RESPONSE STYLE:
- Professional
- Clean formatting
- Short headings
- Bullet points
- Friendly healthcare tone

SAFETY:
- Never give dangerous medical advice
- Recommend doctor consultation when needed
- For emergencies suggest calling clinic immediately
`;

export async function sendMessageToAI(
  message: string,
  history: any[] = []
) {
  try {
    // Prevent crash if API key missing
    if (!ai) {
      return "AI assistant is not configured yet. Please add VITE_GEMINI_API_KEY in environment variables.";
    }

    const contents = [
      ...history,
      {
        role: "user",
        parts: [{ text: message }],
      },
    ];

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents,
      config: {
        systemInstruction: SYSTEM_PROMPT,
      },
    });

    return (
      response.text ||
      "Sorry, I could not generate a response right now."
    );
  } catch (error) {
    console.error("Gemini Error:", error);

    return "I'm sorry, I'm having trouble connecting right now. Please try again later or call the clinic directly at +91 98765 43210.";
  }
}