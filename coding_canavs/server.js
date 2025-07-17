// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';

dotenv.config();
// Added console log to verify API key loading
console.log("🔑 OpenAI Key:", process.env.OPENAI_API_KEY);

const app = express();
const port = process.env.PORT || 5000;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(cors());
app.use(express.json());

// New debug route added to test API connection
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend working ✅' });
});

app.post('/api/review', async (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ error: 'No code provided' });

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a senior software engineer reviewing code.' },
        { role: 'user', content: `Please review the following code:\n\n${code}` },
      ],
    });

    res.json({ result: completion.choices[0].message.content });
  } catch (err) {
    // Modified catch block as requested
    console.error("🔴 Error in /api/review:", err);
    res.status(500).json({ error: err.message || 'OpenAI API error' });
  }
});

app.post('/api/fix', async (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ error: 'No code provided' });

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are an expert bug-fixing assistant.' },
        { role: 'user', content: `Please find and fix any bugs in this code:\n\n${code}` },
      ],
    });

    res.json({ result: completion.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'OpenAI API error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
