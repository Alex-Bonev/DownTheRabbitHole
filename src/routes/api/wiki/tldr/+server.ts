import { openai } from '$lib/server/openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

export async function POST({ request }) {
	const { prompt }: { prompt: string } = await request.json();

  
	const response = await openai.chat.completions.create({
		// model: 'gpt-3.5-turbo-1106',
		model: 'gpt-4-1106-preview',
    // response_format: { "type": "json_object" },
		stream: true,
    seed: 1,
		messages: [
			{
				role: 'system',
				content:
					'You are to play the role of an expert in whatever is input. You will recieve a single term and must respond with the 10 most important facts about it. No more, no less. You MUST provide your response in the format of a javascript array, such as [a,b,c,d], or there will be errors. PLEASE DO NOT NUMBER THE ITEMS'
			},
			{ role: 'user', content: prompt }
		],
		max_tokens: 500
	});
  

	const stream = OpenAIStream(response);
	return new StreamingTextResponse(stream);
}
