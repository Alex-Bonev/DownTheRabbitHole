import { openai } from '$lib/server/openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

export async function POST({ request }) {
	const { prompt }: { prompt: string } = await request.json();

  
	const response = await openai.chat.completions.create({
		model: 'gpt-3.5-turbo-1106',
		// model: 'gpt-4-1106-preview',
    // response_format: { "type": "json_object" },
		stream: true,
    seed: 1,
		messages: [
			{
				role: 'system',
				content:
					'You are to play the role of a teacher. You will recieve two lists, one describing a subject or the aspects of a subject, and the other containing subdivisions of that subject. Your task is to response with four NEW subdivisions of that subject that are not in the second list, with one word each, such that one person could go further in depth into the subject. Provide your response in a javascript array, in the format [a,b,c,d]. '
			},
			{ role: 'user', content: prompt }
		],
		max_tokens: 50
	});
  

	const stream = OpenAIStream(response);
	return new StreamingTextResponse(stream);
}
