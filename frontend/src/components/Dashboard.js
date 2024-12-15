import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './TaskList';
import TaskForm from './TaskForm';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTasks = async () => {
        const token = localStorage.getItem('token');
        try {
            const res = await axios.get('http://localhost:5000/api/tasks', {
                headers: { 'x-auth-token': token },
            });
            setTasks(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-6">My Tasks</h1>
            <TaskForm fetchTasks={fetchTasks} />
            {loading ? (
                <p>Loading...</p>
            ) : (
                <TaskList tasks={tasks} fetchTasks={fetchTasks} />
            )}
        </div>
    );
};

export default Dashboard;
