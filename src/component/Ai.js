import React, { useState } from "react";
import "./ChatBot.css";   // استدعاء ملف التصميم

export default function ChatBot() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    // إضافة رسالة المستخدم
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);

    // رد افتراضي من البوت
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "You said: " + input },
      ]);
    }, 1000);

    setInput("");
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`message ${msg.sender === "user" ? "user" : "bot"}`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="input-box">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}