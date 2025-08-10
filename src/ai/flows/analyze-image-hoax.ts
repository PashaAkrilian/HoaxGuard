'use server';
/**
 * @fileOverview AI flow for analyzing images for misinformation.
 *
 * - analyzeImageHoax - Analyzes an image for potential misinformation.
 * - AnalyzeImageHoaxInput - The input type for the analyzeImageHoax function.
 * - AnalyzeImageHoaxOutput - The return type for the analyzeImageHoax function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeImageHoaxInputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      "The image to analyze, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'"
    ),
  hint: z.string().optional().describe('Optional hint to provide context for the image.'),
});
export type AnalyzeImageHoaxInput = z.infer<typeof AnalyzeImageHoaxInputSchema>;

const AnalyzeImageHoaxOutputSchema = z.object({
  label: z.enum(['hoax', 'tidak_hoax', 'tidak_pasti']).describe('The label indicating whether the image is likely a hoax.'),
  confidence: z.number().min(0).max(1).describe('The confidence score (0-1) of the label.'),
  rationale: z.string().describe('The rationale behind the label.'),
  references:
    z.array(
      z.object({
        title: z.string().describe('The title of the reference.'),
        url: z.string().url().describe('The URL of the reference.'),
      })
    )
    .describe('The references used to determine the label.'),
  ocr_text: z.string().optional().describe('The OCR text extracted from the image, if any.'),
});
export type AnalyzeImageHoaxOutput = z.infer<typeof AnalyzeImageHoaxOutputSchema>;

export async function analyzeImageHoax(input: AnalyzeImageHoaxInput): Promise<AnalyzeImageHoaxOutput> {
  return analyzeImageHoaxFlow(input);
}

const analyzeImageHoaxFlow = ai.defineFlow(
  {
    name: 'analyzeImageHoaxFlow',
    inputSchema: AnalyzeImageHoaxInputSchema,
    outputSchema: AnalyzeImageHoaxOutputSchema,
  },
  async (input) => {
    const {text} = await ai.generate({
        prompt: [
            {text: `You are a member of a fact-checking team that specializes in detecting misinformation in images. Analyze the provided image for potential signs of manipulation, out-of-context usage, or other indicators of being a hoax.

Consider the visual elements, the surrounding context, and any text present in the image (using OCR if necessary). Search for supporting evidence from credible sources to either confirm or deny the image's authenticity.

Your response MUST be a valid JSON object and nothing else. Do not include any text before or after the JSON object.

The JSON object must conform to the following Zod schema:
\`\`\`ts
z.object({
  label: z.enum(['hoax', 'tidak_hoax', 'tidak_pasti']).describe('The label indicating whether the image is likely a hoax.'),
  confidence: z.number().min(0).max(1).describe('The confidence score (0-1) of the label.'),
  rationale: z.string().describe('The rationale behind the label.'),
  references: z.array(z.object({ title: z.string(), url: z.string().url() })).describe('The references used to determine the label.'),
  ocr_text: z.string().optional().describe('The OCR text extracted from the image, if any.'),
})
\`\`\`

Hint: ${input.hint || 'No hint provided.'}`},
            {media: {url: input.imageDataUri}}
        ],
    });

    try {
      // Extract the JSON part from the response, assuming it might be wrapped in markdown
      const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/);
      const jsonString = jsonMatch ? jsonMatch[1] : text;
      const parsed = JSON.parse(jsonString);
      return AnalyzeImageHoaxOutputSchema.parse(parsed);
    } catch (error) {
      console.error('Failed to parse AI response for image analysis:', error, 'Raw response:', text);
      throw new Error('AI returned an invalid response format.');
    }
  }
);
