// helpers/openai.js
export async function getOpenAIResponse(prompt) {
  try {
    const response = await fetch('/api/openai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    return data.aiResponse;
  } catch (error) {
    console.error('API error:', error);
    return 'Error: Unable to get response from OpenAI.';
  }
}
