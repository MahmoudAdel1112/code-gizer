import { GoogleGenAI } from "@google/genai";
import { formatFilesForPrompt } from "./formatFilesForPrompt";
import { generatePrompt } from "./prompt";
import { Aspect } from "../../context/aspectsContext";

export default async function analyzeCodebase(
  files: any,
  owner: string,
  repo: string,
  aspects: Aspect[]
) {
  const formattedAspects = aspects.map((aspect) => aspect.title).join(", ");

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `
    ${generatePrompt(formattedAspects)}
    here are the files: \n${formatFilesForPrompt(files)}`,
  });
  console.log(generatePrompt(formattedAspects));
  // console.log(generatePrompt(aspects));
  return response.text;
}
