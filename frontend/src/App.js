import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/tasks/');
      setTasks(res.data);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!newTitle.trim()) return;
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/tasks/', {
        title: newTitle,
        completed: false,
      });
      setTasks([...tasks, res.data]);
      setNewTitle('');
    } catch (err) {
      console.error('Failed to add task:', err);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1>Task List</h1>
      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          placeholder="New task title"
          style={{ padding: 8, width: '70%' }}
        />
        <button onClick={addTask} style={{ padding: '8px 16px', marginLeft: 8 }}>
          Add
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
          {tasks.map(task => (
            <li key={task.id} style={{ padding: 8, borderBottom: '1px solid #ddd' }}>
              {task.title} {task.completed ? '✔️' : ''}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
