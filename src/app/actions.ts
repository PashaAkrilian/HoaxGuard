'use server';

import { z } from 'zod';
import { analyzeTextHoax } from '@/ai/flows/analyze-text-hoax';
import { analyzeImageHoax } from '@/ai/flows/analyze-image-hoax';
import type { AnalysisResult } from '@/lib/types';

const textSchema = z.object({
  text: z.string().min(10, 'Text must be at least 10 characters long.'),
});

const imageSchema = z.object({
    imageDataUri: z.string().startsWith('data:image', 'Invalid image data URI.'),
    hint: z.string().optional(),
});

const imageUrlSchema = z.object({
    imageUrl: z.string().url('Invalid URL format.'),
    hint: z.string().optional(),
});

async function fetchImageAsDataUri(url: string): Promise<string> {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch image: ${response.statusText}`);
        }
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.startsWith('image/')) {
            throw new Error('URL does not point to a valid image.');
        }
        const buffer = await response.arrayBuffer();
        const base64 = Buffer.from(buffer).toString('base64');
        return `data:${contentType};base64,${base64}`;
    } catch (error) {
        console.error('Error fetching image as data URI:', error);
        throw new Error('Could not process the image from the provided URL. Please check the URL or try uploading the file directly.');
    }
}

export async function handleTextAnalysis(
  prevState: any,
  formData: FormData
): Promise<AnalysisResult | { error: string }> {
  const validatedFields = textSchema.safeParse({
    text: formData.get('text'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors.text?.[0] || 'Invalid input.',
    };
  }

  try {
    const result = await analyzeTextHoax({ text: validatedFields.data.text });
    return { type: 'text', ...result };
  } catch (error: any) {
    console.error('Text analysis failed:', error);
    const errorMessage = error?.message || 'An unknown error occurred.';
    return { error: `Failed to analyze text: ${errorMessage}` };
  }
}


export async function handleImageAnalysis(
  prevState: any,
  formData: FormData
): Promise<AnalysisResult | { error: string }> {
    const inputType = formData.get('inputType');
    const hint = formData.get('hint') as string || '';

    try {
        let imageDataUri: string;
        let imageUrl: string | undefined;

        if (inputType === 'upload') {
            const validatedFields = imageSchema.safeParse({
                imageDataUri: formData.get('imageDataUri'),
                hint,
            });

            if (!validatedFields.success) {
                return { error: validatedFields.error.flatten().fieldErrors.imageDataUri?.[0] || 'Invalid image file.' };
            }
            imageDataUri = validatedFields.data.imageDataUri;
            imageUrl = imageDataUri;
        } else if (inputType === 'url') {
            const validatedFields = imageUrlSchema.safeParse({
                imageUrl: formData.get('imageUrl'),
                hint,
            });
            if (!validatedFields.success) {
                return { error: validatedFields.error.flatten().fieldErrors.imageUrl?.[0] || 'Invalid image URL.' };
            }
            imageUrl = validatedFields.data.imageUrl;
            imageDataUri = await fetchImageAsDataUri(imageUrl);
        } else {
            return { error: 'Invalid input type selected.' };
        }

        const result = await analyzeImageHoax({ imageDataUri, hint });
        return { type: 'image', imageUrl, ...result };

    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred during image analysis.';
        console.error('Image analysis failed:', error);
        return { error: errorMessage };
    }
}
