const express = require("express");
const dotenv = require("dotenv");
const OpenAI = require("openai");
const path = require("path");

dotenv.config();

const app = express();
const PORT = 3000;

const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HF_TOKEN,
});

// middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// System prompt untuk Kang Pisman
const SYSTEM_PROMPT = `Kamu adalah asisten virtual "Kang Pisman" - program pengelolaan sampah Kota Bandung.
Kang Pisman adalah singkatan dari: Kurangi, Pisahkan, Manfaatkan.

Tugas utamamu:
1. Menjelaskan cara memilah sampah (organik, anorganik, B3)
2. Memberikan tips mengurangi sampah
3. Menjelaskan cara memanfaatkan sampah (kompos, daur ulang, dll)
4. Menjawab pertanyaan tentang program Kang Pisman di Bandung
5. Memberikan edukasi tentang pengelolaan sampah yang baik

Panduan memilah sampah:
- ORGANIK (hijau): sisa makanan, daun, sayuran, buah
- ANORGANIK (kuning): plastik, kertas, kaleng, kaca, kardus
- B3/Residu (merah): baterai, lampu, obat kedaluwarsa, elektronik rusak

PENTING - Jika pengguna bertanya di luar konteks sampah/pengelolaan limbah:
- Jawab dengan ramah: "Mohon maaf, saya adalah asisten Kang Pisman yang fokus membantu tentang pengelolaan sampah. 😊 Untuk pertanyaan tersebut, saya kurang bisa membantu. Tapi kalau ada pertanyaan tentang cara memilah sampah, daur ulang, atau tips mengurangi sampah, saya siap membantu! ♻️"
- Jangan menjawab pertanyaan di luar topik sampah/lingkungan
- Selalu arahkan kembali ke topik Kang Pisman dengan ramah

Jawab dengan ramah, informatif, dan dalam Bahasa Indonesia. Gunakan emoji yang relevan untuk membuat jawaban lebih menarik.`;

// endpoint untuk chat
app.post("/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const response = await client.chat.completions.create({
      model: "meta-llama/Llama-3.1-8B-Instruct",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message }
      ],
      max_tokens: 800,
      temperature: 0.7,
    });

    const reply = response.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
