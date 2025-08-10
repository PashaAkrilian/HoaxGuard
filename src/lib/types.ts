import type { AnalyzeTextHoaxOutput } from "@/ai/flows/analyze-text-hoax";
import type { AnalyzeImageHoaxOutput } from "@/ai/flows/analyze-image-hoax";

export type TextAnalysisResult = AnalyzeTextHoaxOutput;
export type ImageAnalysisResult = AnalyzeImageHoaxOutput & { imageUrl?: string };

export type AnalysisResult =
  | ({ type: "text" } & TextAnalysisResult)
  | ({ type: "image" } & ImageAnalysisResult);
