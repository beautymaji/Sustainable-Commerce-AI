import React from 'react';
import ChatBot from '../components/ChatBot';

const SupportBot = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Module 4: WhatsApp Support Bot</h2>
        <p>Enhance customer support with real-time AI assistance.</p>
      </div>
      <div className="content-card chat-page-card">
        <ChatBot />
      </div>
    </div>
  );
};

export default SupportBot;