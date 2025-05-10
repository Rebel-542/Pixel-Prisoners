'use server';
/**
 * @fileOverview Generates an image for the fake call screen.
 * - generateFakeCallImage - A function that generates the image.
 * - GenerateFakeCallImageOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const GenerateFakeCallImageOutputSchema = z.object({
  imageDataUri: z
    .string()
    .describe('The generated image as a data URI.'),
});
export type GenerateFakeCallImageOutput = z.infer<typeof GenerateFakeCallImageOutputSchema>;

export async function generateFakeCallImage(): Promise<GenerateFakeCallImageOutput> {
  // Pass an empty object as input if the flow expects one, even if not used by the prompt directly.
  return generateFakeCallImageFlow({});
}

const generateFakeCallImageFlow = ai.defineFlow(
  {
    name: 'generateFakeCallImageFlow',
    inputSchema: z.object({}), // Flow expects an input object, even if empty for this specific prompt
    outputSchema: GenerateFakeCallImageOutputSchema,
  },
  async () => {
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-exp', // Specific model for image generation
      prompt: `Generate an image in the style of an Apple Memoji or a similar friendly 3D avatar style. The image should feature a person holding a modern smartphone to their ear, appearing as if they are on a call. The person should have a neutral or pleasant expression, and could be wearing simple, casual attire. The background should be clean and unobtrusive, ideally transparent or a solid light color to keep the focus on the person. The image should be cropped from the chest or shoulders up. The style should be clear, well-lit, and suitable for a user interface element representing an incoming call. The smartphone itself should be clearly visible and recognizable as a modern device.`,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
        // Optional: Add safety settings if needed, e.g., to be less restrictive for certain content.
        // safetySettings: [
        //   { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
        // ],
      },
    });

    if (!media || !media.url) {
      throw new Error('Image generation failed or returned no media.');
    }
    // The media.url will be a data URI, e.g., "data:image/png;base64,..."
    return { imageDataUri: media.url };
  }
);
