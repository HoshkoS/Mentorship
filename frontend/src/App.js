import React, { useEffect, useState } from 'react';
import api from './utils/axios';

const App = () => {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGreeting = async () => {
      try {
        const response = await api.get('/greetings');
        setMessage(response.data);
      } catch (error) {
        setError('Error fetching greeting');
      }
    };

    fetchGreeting();
  }, []);

  return (
    <div>
      <h1>Greeting App</h1>
      {error && <p>{error}</p>}
      {message ? (
        <p>{message}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;
