import axios from "axios";

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
