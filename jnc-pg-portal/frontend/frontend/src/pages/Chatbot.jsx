import React, { useState, useEffect } from "react";
import "./chatbot.css";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          text: "Hi! I'm Jyoti 👋 How can I help you today?",
          sender: "bot"
        }
      ]);
    }
  }, [open]);

  const sendMessage = async () => {
    if (!input) return;

    const userMsg = { text: input, sender: "user" };
    setMessages(prev => [...prev, userMsg]);
    setTyping(true);

    try {
      const res = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: input })
      });

      const data = await res.json();

      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { text: data.reply, sender: "bot" }
        ]);
        setTyping(false);
      }, 800);

    } catch {
      setMessages(prev => [
        ...prev,
        { text: "Server error. Try again later.", sender: "bot" }
      ]);
      setTyping(false);
    }

    setInput("");
  };

  return (
    <>
      <div
        className="chat-button"
        onClick={() => {
          if (open) setMessages([]);
          setOpen(!open);
        }}
      >
        💬
      </div>

      {open && (
        <div className="chat-window">

          <div className="chat-header">
            Jyoti Assistant
          </div>

          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`msg ${msg.sender}`}>
                {msg.text}
              </div>
            ))}

            {typing && <div className="msg bot">Typing...</div>}
          </div>

          <div className="chat-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something..."
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
            />
            <button onClick={sendMessage}>Send</button>
          </div>

        </div>
      )}
    </>
  );
}

export default Chatbot;