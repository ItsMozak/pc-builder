import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "apikey",
  dangerouslyAllowBrowser: true
});

export default async function sendPromptToGPT(prompt) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that provides PC build recommendations based on user preferences.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    // Get the AI's response
    const aiResponse = response.choices[0].message.content;
    console.log(aiResponse);
    return aiResponse;
  } catch (error) {
    console.error("Error in sending prompt to GPT:", error);
    return "There was an error processing your request.";
  }
}
