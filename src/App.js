import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [responses, setResponses] = useState([]);

  const handleSubmit = async () => {
    setLoading(true);
    for (let i = 1; i <= 1000; i++) {
      await sendRequest(i);
    }
    setLoading(false);
  };

  const sendRequest = async (index) => {
    try {
      const response = await axios.post('http://localhost:5000//api', { index });
      setResponses(prevResponses => [...prevResponses, response.data.index]);
    } catch (error) {
      console.error('Error:', error.response.data);
    }
  };

  return (
      <div>
        <input
            type="number"
            min="0"
            max="100"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={handleSubmit} disabled={loading || !inputValue}>Start</button>
        <ul>
          {responses.map((index, i) => (
              <li key={i}>Request {index}</li>
          ))}
        </ul>
      </div>
  );
};

export default App;
