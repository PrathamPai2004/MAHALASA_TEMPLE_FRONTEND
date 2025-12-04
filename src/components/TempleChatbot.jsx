import { useState } from "react";
import "../styles/TempleChatbot.css";

export default function TempleChatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
	
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    const res = await fetch("http://localhost:3001/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: input }),
    });

    const data = await res.json();
    const botMsg = { sender: "bot", text: data.answer };
    setMessages((prev) => [...prev, botMsg]);

    setInput("");
	
  };

  return (
  <div className="tp-container">
    <header className="tp-header">
      {/* <h1 className="tp-title">🛕 Temple ChatBot</h1> */}
      <p className="tp-subtitle">Ask anything about temple timings, sevas, bookings & more</p>
    </header>

    {/* LEFT BIG TEXT */}
    <div className="tp-side-text tp-left-text">
      {"TEMPLE".split("").map((ch, i) => <span key={i}>{ch}</span>)}
    </div>

    {/* RIGHT BIG TEXT */}
    <div className="tp-side-text tp-right-text">
      {"CHATBOT".split("").map((ch, i) => <span key={i}>{ch}</span>)}
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
  			if (e.key === "Enter") {
				// e.target.value = "";
    			// e.preventDefault();  // 🔥 stops refresh
    			sendMessage();
  			}	
		}}
        />
				<button
		className="tp-send-btn"
		onClick={(e) => {
			// e.preventDefault();
			sendMessage();
		}}
		>
		Send
		</button>
      </div>
    </div>

    <footer className="tp-footer">
      © {new Date().getFullYear()} Your Temple | Powered by Mistral + Ollama
    </footer>
  </div>
);

}
