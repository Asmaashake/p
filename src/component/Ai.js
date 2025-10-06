
import React, { useState } from "react";
import { SendOutlined, CommentOutlined, CloseOutlined } from "@ant-design/icons";
import "./ChatBot.css";

export default function ChatBotPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);

    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "bot", text: "You said: " + input }]);
    }, 1000);

    setInput("");
  };

  return (
    <>
      {/* زر الشات المنبثق */}
      <button
        className="chat-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <CloseOutlined /> : <CommentOutlined />}
      </button>

      {/* نافذة الشات */}
      {isOpen && (
        <div className="chat-popup">
          {/* Header الشات ممتد */}
          <div className="chat-header">
            <header style={{background:"#522524",color:"white"}}>💬 Chat AI</header>
            <button
              className="chat-header-close-btn"
              onClick={() => setIsOpen(false)}
            >
              
            </button>
          </div>

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
              <button onClick={handleSend}>
                <SendOutlined style={{ color: "#000", fontSize: 18 }} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
