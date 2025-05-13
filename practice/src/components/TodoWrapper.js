import { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import EditTodoForm from './EditTodoForm';
import Todo from './Todo';
import AxiosClient from '../Services/AxiosClient';
import { ClipLoader } from "react-spinners";

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
            const response = await AxiosClient.get('/todo/todos', {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log(response.data.data)
            const finalTodos = todos.map((todo) => ({ ...todo, isEditing: false }));
            setTodos(finalTodos);
        } catch (err) {
            setError("Failed to fetch todos.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Add Todo
    const addTodo = async (title) => {
        setLoading(true)
        try {
            const response = await AxiosClient.post('/todo/add', {
                "title": title,
                "description": ""
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // console.log(response);
            setTodos([...todos, response.data.newTodo]);
        } catch (err) {
            setError("Failed to add todo.");
            console.error(err);
        }
        finally {
            setLoading(false)
        }
    };

    // Delete Todo
    const deleteTodo = async (id) => {
        setLoading(true)
        try {
            await AxiosClient.delete('/todo/delete', {
                headers: { Authorization: `Bearer ${token}` },
                data: {
                    "todoId": id
                }
            });
            console.log('deleted TODO')
            const newTodos = todos.filter((todo) => todo._id !== id)
            setTodos(newTodos);
        } catch (err) {
            setError("Failed to delete todo.");
            console.error(err);
        }
        finally {
            setLoading(false)
        }
    };

    // Toggle Complete Todo
    const toggleComplete = async (todo) => {
        setLoading(true)
        try {
            const response = await AxiosClient.put(`/todo/update`, { ...todo, todoId: todo._id, completed: !todo.completed }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log(response)

            setTodos(todos.map((todoItem) => (todoItem._id === todo._id ? response.data.updatedTodo : todoItem)));
        } catch (err) {
            setError("Failed to toggle completion.");
            console.error(err);
        }
        finally {
            setLoading(false)
        }
    };

    // Update Todo Todo
    const editTodo = async (newTitle, todo) => {
        try {
            const response = await AxiosClient.put(`/todo/update`, { newTitle, todo }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTodos(todos.map((todo) => (todo.id === todo._id ? response.data : todo)));
        } catch (err) {
            setError("Failed to update todo.");
            console.error(err);
        }
    };

    return (
        <div className="TodoWrapper">
            <h1>Todo List</h1>
            <TodoForm addTodo={addTodo} />
            {loading &&
                <ClipLoader
                    loading={loading}
                    size={150}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />}
            {error && <p>{error}</p>}

            {todos.map((todo) =>
                todo.isEditing ?
                    <EditTodoForm editTodo={editTodo} todo={todo} /> :
                    <Todo
                        todo={todo}
                        deleteTodo={deleteTodo}
                        enableEditing={(id) => setTodos(todos.map((todoItem) => todoItem._id === id ? { todoItem, isEditing: true } : todoItem))}
                        toggleComplete={toggleComplete}
                    />
            )}
        </div>
    );
}

export default TodoWrapper;
