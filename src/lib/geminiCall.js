/**
 * Generate a Situation Description using Gemini API
 * @param {string} situationType - Type of the situation (e.g., "Current Financial Situation")
 * @param {string} info - Short info provided by the user
 * @returns {Promise<string>} - The AI-generated description
 */
export async function generateSituationDescription(situationType, info) {
  const apiKey = "AIzaSyAfMa6ItYchF1uvIBwO0hsopqwWzZZ7IV0"; // set your key as an environment variable
  const url =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=" +
    apiKey;

  const prompt = `
  Write a clear and natural "Situation Description" based on the details below.
  - Situation Type: ${situationType}
  - Info: ${info}
  Make it sound professional and concise (around 3-5 sentences).
  make it atleast five sentences.
  `;

  // Show alert if taking too long
  let slowResponseTimer;
  slowResponseTimer = setTimeout(() => {
    alert("⏳ Generating the AI description is taking longer than usual. Please wait...");
  }, 20000); // alert after 20 seconds

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    });

    clearTimeout(slowResponseTimer); // cancel alert timer if request finishes

    const data = await response.json();
    console.log(data, "data");

    return (
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No description generated."
    );
  } catch (error) {
    clearTimeout(slowResponseTimer);
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate situation description.");
  }
}

