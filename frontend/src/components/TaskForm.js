import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ fetchTasks }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleAddTask = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await axios.post(
                'http://localhost:5000/api/tasks',
                { title, description },
                { headers: { 'x-auth-token': token } }
            );
            setTitle('');
            setDescription('');
            fetchTasks();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleAddTask} className="mb-4">
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border px-4 py-2 rounded mb-2"
                required
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border px-4 py-2 rounded mb-2"
            />
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
                Add Task
            </button>
        </form>
    );
};

export default TaskForm;
