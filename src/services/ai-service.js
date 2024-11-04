import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "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",
  dangerouslyAllowBrowser: true
});

export default async function sendPromptToGPT(prompt) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that provides PC build recommendations based on user preferences.",
        },
        {
          role: "user",
          content: prompt,
        },
      ]
    });

    // Get the AI's response
    const aiResponse = JSON.parse(response.choices[0].message.content);
    return aiResponse;
  } catch (error) {
    console.error("Error in sending prompt to GPT:", error);
    return "There was an error processing your request.";
  }
}
