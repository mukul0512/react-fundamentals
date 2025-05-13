import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import { v4 as uuidv4 } from "uuid";
import EditTodoForm from './EditTodoForm';
import Todo from './Todo';
import axios from 'axios';

function TodoWrapper() {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const token = sessionStorage.getItem("authToken");

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/todos', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTodos(response.data);
        } catch (err) {
            setError("Failed to fetch todos.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Add Todo
    const addTodo = async (todo) => {
        try {
            const response = await axios.post('/api/todos', { task: todo }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTodos([...todos, response.data]);
        } catch (err) {
            setError("Failed to add todo.");
            console.error(err);
        }
    };

    // Delete Todo
    const deleteTodo = async (id) => {
        try {
            await axios.delete(`/api/todos/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTodos(todos.filter((todo) => todo.id !== id));
        } catch (err) {
            setError("Failed to delete todo.");
            console.error(err);
        }
    };

    // Toggle Complete Todo
    const toggleComplete = async (id) => {
        const todo = todos.find((todo) => todo.id === id);
        try {
            const response = await axios.put(`/api/todos/${id}`, { completed: !todo.completed }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTodos(todos.map((todo) => (todo.id === id ? response.data : todo)));
        } catch (err) {
            setError("Failed to toggle completion.");
            console.error(err);
        }
    };

    // Edit Task Todo
    const editTask = async (task, id) => {
        try {
            const response = await axios.put(`/api/todos/${id}`, { task }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTodos(todos.map((todo) => (todo.id === id ? response.data : todo)));
        } catch (err) {
            setError("Failed to update todo.");
            console.error(err);
        }
    };

    return (
        <div className="TodoWrapper">
            <h1>Todo List</h1>
            <TodoForm addTodo={addTodo} />
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            {/* Display Todos */}
            {todos.map((todo) =>
                todo.isEditing ? (
                    <EditTodoForm editTodo={editTask} task={todo} key={todo.id} />
                ) : (
                    <Todo
                        key={todo.id}
                        task={todo}
                        deleteTodo={deleteTodo}
                        editTodo={editTask}
                        toggleComplete={toggleComplete}
                    />
                )
            )}
        </div>
    );
}

export default TodoWrapper;
