import axios from "axios";

export async function aiGenerate(prompt) {
  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/gpt2",
      { inputs: prompt },
      {
        headers: {
  "Authorization": "Bearer YOUR_TOKEN",
  "Content-Type": "application/json",
},

      }
    );

    if (response.data && Array.isArray(response.data) && response.data[0].generated_text) {
      return response.data[0].generated_text;
    }

    return "No AI response available.";
  } catch (err) {
    console.error("❌ AI generation failed:", err);
    throw new Error("AI generation failed");
  }
}
