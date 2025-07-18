// coding_canavs/routes/generateCode.js
import express from 'express';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';

dotenv.config();
const router = express.Router();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post('/', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a helpful coding assistant. Only return code." },
        { role: "user", content: prompt },
      ],
      temperature: 0.3,
    });

    const code = response.choices[0].message.content;
    res.json({ code });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Code generation failed' });
  }
});

export default router;
