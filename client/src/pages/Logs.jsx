import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Logs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        // We need to create this backend route first!
        const res = await axios.get('http://localhost:5000/api/products/logs');
        setLogs(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLogs();
  }, []);

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>AI Interaction Logs</h2>
        <p>Transparency view of all AI prompts and responses stored in the database.</p>
      </div>
      
      <div className="logs-container">
        {logs.length === 0 ? (
          <p>No logs found. Use Module 1 or 4 to generate data.</p>
        ) : (
          logs.map((log) => (
            <div key={log._id} className="log-card">
              <div className="log-header">
                <span className={`log-badge ${log.module === 'CategoryGenerator' ? 'badge-blue' : 'badge-green'}`}>
                  {log.module}
                </span>
                <span className="log-time">{new Date(log.timestamp).toLocaleString()}</span>
              </div>
              <div className="log-body">
                <div className="log-section">
                  <strong>User Prompt:</strong>
                  <p>{log.prompt}</p>
                </div>
                <div className="log-section">
                  <strong>AI Response:</strong>
                  <pre>{JSON.stringify(log.response, null, 2)}</pre>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Logs;