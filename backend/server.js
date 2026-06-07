import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import pkg from 'pg';
const { Pool } = pkg;

const app = express();
app.use(express.json());
app.use(cors());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@postgres-service:5432/translations'
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date() });
});


async function translateText(text, target) {
  try {
    const translatorHost = process.env.TRANSLATOR_HOST || 'translator';
    const res = await fetch(`http://${translatorHost}:5000/translate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ q: text, source: 'auto', target, format: 'text' })
    });
    const data = await res.json();
    return data.translatedText;
  } catch (err) {
    console.error('Translation error:', err);
    return '(שגיאה בתרגום)';
  }
}

app.post('/translate', async (req, res) => {
  const { text, target } = req.body;
  if (!text || !target) return res.status(400).json({ error: 'Missing text or target' });

  const translatedText = await translateText(text, target);
  try {
    await pool.query('INSERT INTO translations (source_text, target_lang, translated_text) VALUES ($1,$2,$3)', [text, target, translatedText]);
  } catch (dbErr) {
    console.error('DB Insert Error:', dbErr);
  }
  res.json({ translatedText });
});

app.get('/history', async (req, res) => {
  try {
    const r = await pool.query('SELECT source_text, translated_text FROM translations ORDER BY id DESC LIMIT 10');
    res.json(r.rows);
  } catch (dbErr) {
    res.status(500).json({ error: 'Database error' });
  }
});

app.listen(3001, () => console.log('✅ Backend running on port 3001'));