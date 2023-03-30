// pages/api/openai.js
import OpenAI from 'openai';

const openai = new OpenAI(process.env.REACT_APP_OPENAI_API_KEY);

export default async function handler(req, res) {
  const { prompt } = req.body;

  try {
    const response = await openai.Completion.create({
      engine: 'gpt-3.5-turbo',
      prompt: prompt,
      max_tokens: 150,
      n: 1,
      stop: null,
      temperature: 0.8,
    });

    res.status(200).json({ aiResponse: response.choices[0].text.trim() });
  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ error: 'Unable to get response from OpenAI.' });
  }
}
