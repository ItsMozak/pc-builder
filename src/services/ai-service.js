import OpenAI from "openai";
import axios from "axios";
// import { Axios } from "axios";

const openai = new OpenAI({
  apiKey: "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",
  dangerouslyAllowBrowser: true
});

export default async function sendPromptToGPT(prompt) {
  const response = await axios.post('https://movenlabs.pythonanywhere.com/api/data/getLink', {
    prompt: prompt
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  );
  return response.data;
}
