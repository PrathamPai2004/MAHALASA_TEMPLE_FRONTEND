import { useState } from "react";
import axios from "axios";   // <-- added axios
import "../styles/TempleChatbot.css";

export default function TempleChatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await axios.post("https://mahalasa-temple-backend.onrender.com/chat", {
        question: input,
      });

      const botMsg = { sender: "bot", text: res.data.answer };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("Chatbot error:", err);
      const errorMsg = { sender: "bot", text: "Error: Unable to reach server." };
      setMessages((prev) => [...prev, errorMsg]);
    }

    setInput("");
  };

  return (
    <div className="tp-container">
      <header className="tp-header">
        <p className="tp-subtitle">
          Ask anything about temple timings, sevas, bookings & more
        </p>
      </header>

      {/* LEFT BIG TEXT */}
      <div className="tp-side-text tp-left-text">
        {"TEMPLE".split("").map((ch, i) => (
          <span key={i}>{ch}</span>
        ))}
      </div>

      {/* RIGHT BIG TEXT */}
      <div className="tp-side-text tp-right-text">
        {"CHATBOT".split("").map((ch, i) => (
          <span key={i}>{ch}</span>
        ))}
      </div>

      <div className="tp-chat-card">
        <div className="tp-chat-window">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`tp-bubble ${
                msg.sender === "user" ? "tp-user" : "tp-bot"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className="tp-input-area">
          <input
            type="text"
            className="tp-input"
            placeholder="Ask your question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
          />
          <button className="tp-send-btn" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>

      <footer className="tp-footer">
        © {new Date().getFullYear()} Pratham's Temple Project | Powered by Groq
      </footer>
    </div>
  );
}

