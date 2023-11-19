import { openai } from "$lib/server/openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

export async function POST({ request }) {
  const { prompt }: { prompt: string } = await request.json();

  const response = await openai.chat.completions.create({
    // model: "gpt-3.5-turbo-1106",
    model: 'gpt-4-1106-preview',
    // response_format: { type: "json_object" },
    stream: true,
    seed: 1,
    messages: [
      {
        role: "system",
        content:
          "You are to play the role of an expert on the given topic. You are writing the wiki page for the given topic, and are tasked with creating subheadings and paragraphs to accompany them. Limit yourself to 4 sections. Use Markdown for the headings.",
      },
      { role: "user", content: prompt },
    ],
    max_tokens: 1000,
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
