// controllers/chatController.js
import FAQ from "../models/FAQ.js";

export const chatReply = async (req, res) => {
  try {
    const userMessage = req.body.message.toLowerCase();

    const faqs = await FAQ.find();

    let bestMatch = null;
    let maxScore = 0;

    faqs.forEach(faq => {
      let score = 0;

      faq.keywords.forEach(keyword => {
        if (userMessage.includes(keyword.toLowerCase())) {
          score++;
        }
      });

      if (score > maxScore) {
        maxScore = score;
        bestMatch = faq;
      }
    });

    if (bestMatch && maxScore > 0) {
      return res.json({ reply: bestMatch.answer });
    }

    // 🔥 SMART FALLBACK
    const fallbackReplies = [
      "I'm not sure about that. You can contact the college office.",
      "Let me connect you with the right department.",
      "Please visit the official website or contact admin.",
      "That’s a great question! Please check with the concerned department."
    ];

    const randomReply =
      fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];

    res.json({ reply: randomReply });

  } catch (err) {
    res.status(500).json({ reply: "Server error" });
  }
};