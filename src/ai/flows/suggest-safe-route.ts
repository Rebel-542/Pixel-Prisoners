// This is an AI-powered module that suggests a safe route based on well-lit and populated areas.
// It takes a start and end location as input and returns a route suggestion.
// The route suggestion includes a description of the route and any potential safety concerns.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestSafeRouteInputSchema = z.object({
  startLocation: z
    .string()
    .describe('The starting location for the route. e.g. 1600 Amphitheatre Parkway, Mountain View, CA'),
  endLocation: z
    .string()
    .describe('The destination location for the route. e.g. 1 Infinite Loop, Cupertino, CA'),
});
export type SuggestSafeRouteInput = z.infer<typeof SuggestSafeRouteInputSchema>;

const SuggestSafeRouteOutputSchema = z.object({
  routeDescription: z.string().describe('A detailed description of the suggested route.'),
  safetyConcerns: z
    .string()
    .describe('Any potential safety concerns along the route, such as poorly lit areas or high crime rates.'),
});
export type SuggestSafeRouteOutput = z.infer<typeof SuggestSafeRouteOutputSchema>;

export async function suggestSafeRoute(input: SuggestSafeRouteInput): Promise<SuggestSafeRouteOutput> {
  return suggestSafeRouteFlow(input);
}

const suggestSafeRoutePrompt = ai.definePrompt({
  name: 'suggestSafeRoutePrompt',
  input: {schema: SuggestSafeRouteInputSchema},
  output: {schema: SuggestSafeRouteOutputSchema},
  prompt: `Suggest a safe route from {{startLocation}} to {{endLocation}} based on well-lit and populated areas.

Consider the following factors when suggesting the route:

*   Lighting conditions
*   Population density
*   Crime rates
*   Availability of public transportation
*   Sidewalk conditions

Provide a detailed description of the suggested route and any potential safety concerns along the route.

Output:
`,
});

const suggestSafeRouteFlow = ai.defineFlow(
  {
    name: 'suggestSafeRouteFlow',
    inputSchema: SuggestSafeRouteInputSchema,
    outputSchema: SuggestSafeRouteOutputSchema,
  },
  async input => {
    const {output} = await suggestSafeRoutePrompt(input);
    return output!;
  }
);
