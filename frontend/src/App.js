import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/tasks/')
      .then(res => setTasks(res.data));
  }, []);

  return (
    <div>
      <h1>Tasks</h1>
      <ul>
        {tasks.map(t => (
          <li key={t.id}>{t.title} - {t.completed ? '✔' : '❌'}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
