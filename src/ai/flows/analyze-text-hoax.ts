'use server';
/**
 * @fileOverview A text analysis AI agent to detect misinformation.
 *
 * - analyzeTextHoax - A function that handles the text analysis process.
 * - AnalyzeTextHoaxInput - The input type for the analyzeTextHoax function.
 * - AnalyzeTextHoaxOutput - The return type for the analyzeTextHoax function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeTextHoaxInputSchema = z.object({
  text: z.string().describe('The text to analyze for misinformation.'),
});
export type AnalyzeTextHoaxInput = z.infer<typeof AnalyzeTextHoaxInputSchema>;

const AnalyzeTextHoaxOutputSchema = z.object({
  label: z.enum(['hoax', 'tidak_hoax', 'tidak_pasti']).describe('The label indicating whether the text is a hoax, not a hoax, or uncertain.'),
  confidence: z.number().min(0).max(1).describe('The confidence score of the analysis (0-1).'),
  rationale: z.string().describe('The rationale behind the analysis.'),
  references: z
    .array(
      z.object({
        title: z.string().describe('The title of the reference.'),
        url: z.string().url().describe('The URL of the reference.'),
      })
    )
    .describe('The references used to support the analysis.'),
});
export type AnalyzeTextHoaxOutput = z.infer<typeof AnalyzeTextHoaxOutputSchema>;

export async function analyzeTextHoax(input: AnalyzeTextHoaxInput): Promise<AnalyzeTextHoaxOutput> {
  return analyzeTextHoaxFlow(input);
}

const analyzeTextHoaxFlow = ai.defineFlow(
  {
    name: 'analyzeTextHoaxFlow',
    inputSchema: AnalyzeTextHoaxInputSchema,
    outputSchema: AnalyzeTextHoaxOutputSchema,
  },
  async (input) => {
    const {text} = await ai.generate({
      prompt: `You are a highly skeptical fact-checker. Analyze the following text for misinformation. Search for evidence from credible sources to support your analysis.

If the evidence is strong, conclude with 'hoax' or 'tidak_hoax'. If the evidence is weak or conflicting, conclude with 'tidak_pasti'.

Your response MUST be a valid JSON object and nothing else. Do not include any text before or after the JSON object.

The JSON object must conform to the following Zod schema:
\`\`\`ts
z.object({
  label: z.enum(['hoax', 'tidak_hoax', 'tidak_pasti']).describe('The label indicating whether the text is a hoax, not a hoax, or uncertain.'),
  confidence: z.number().min(0).max(1).describe('The confidence score of the analysis (0-1).'),
  rationale: z.string().describe('The rationale behind the analysis.'),
  references: z.array(z.object({ title: z.string(), url: z.string().url() })).describe('The references used to support the analysis.'),
})
\`\`\`

Text to analyze:
---
${input.text}
---
`,
    });

    try {
      // Extract the JSON part from the response, assuming it might be wrapped in markdown
      const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/);
      const jsonString = jsonMatch ? jsonMatch[1] : text;
      const parsed = JSON.parse(jsonString);
      return AnalyzeTextHoaxOutputSchema.parse(parsed);
    } catch (error) {
      console.error('Failed to parse AI response for text analysis:', error, 'Raw response:', text);
      throw new Error('AI returned an invalid response format.');
    }
  }
);
