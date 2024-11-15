import React, { useEffect, useState } from 'react';
import api from './utils/axios';

const App = () => {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/greetings')
      .then((res) =>
        setMessage(res.data)
      ).catch(() =>
        setError('Error fetching greeting')
      )
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
