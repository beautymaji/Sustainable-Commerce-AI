import React, { useState, useEffect, useRef } from 'react';
import { sendChatMessage } from '../services/api';

const ChatBot = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // 1. Create a ref to handle auto-scrolling
  const messagesEndRef = useRef(null);

  // 2. Function to scroll to the bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 3. Effect to trigger scroll whenever chat history or loading state changes
  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, loading]);

  const handleSend = async () => {
    // Prevent sending if empty or already processing
    if (!message.trim() || loading) return;

    const userText = message;
    
    // Add user message to UI immediately
    const userMsg = { text: userText, sender: 'user', id: Date.now() };
    setChatHistory(prev => [...prev, userMsg]);
    
    // Clear input and set loading
    setMessage('');
    setLoading(true);

    try {
      const res = await sendChatMessage({ message: userText, sender: 'user_gui' });
      
      const botMsg = { 
        text: res.data.replyMessage, 
        sender: 'bot', 
        escalate: res.data.escalate,
        id: Date.now() + 1 
      };
      
      setChatHistory(prev => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
      const errorMsg = { 
        text: "Connection error. Please check if the server is running.", 
        sender: 'bot', 
        id: Date.now() + 1 
      };
      setChatHistory(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="chat-window">
        {chatHistory.length === 0 && (
          <div style={{textAlign: 'center', color: '#95a5a6', margin: 'auto'}}>
            <p>Simulation: WhatsApp Support</p>
            <p>Type "Where is order ORD-123?" to test.</p>
          </div>
        )}
        
        {chatHistory.map((msg) => (
          <div key={msg.id} className={`message ${msg.sender === 'user' ? 'user-msg' : 'bot-msg'}`}>
            {msg.text}
            {msg.escalate && <div className="escalation-alert">🚨 Escalated to Human Support</div>}
          </div>
        ))}

        {/* 4. Show Typing Indicator when loading */}
        {loading && (
          <div className="message bot-msg">
            <span style={{ fontStyle: 'italic', color: '#7f8c8d' }}>Bot is typing...</span>
          </div>
        )}
        
        {/* Dummy element to scroll to */}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-area">
        <input
          className="form-input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          disabled={loading} // Disable input while loading
        />
        <button className="btn-primary" onClick={handleSend} disabled={loading}>
          {loading ? '...' : 'Send'}
        </button>
      </div>
    </>
  );
};

export default ChatBot;