import React from 'react';
import axios from 'axios';

const TaskList = ({ tasks, fetchTasks }) => {
    const deleteTask = async (id) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
                headers: { 'x-auth-token': token },
            });
            fetchTasks();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="mt-4">
            {tasks.map((task) => (
                <div key={task._id} className="bg-white p-4 rounded shadow mb-2 flex justify-between">
                    <div>
                        <h3 className="font-bold">{task.title}</h3>
                        <p>{task.description}</p>
                    </div>
                    <button
                        className="text-red-500"
                        onClick={() => deleteTask(task._id)}
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
};

export default TaskList;
