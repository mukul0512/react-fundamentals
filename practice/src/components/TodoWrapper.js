import { useState, useEffect } from 'react';
// import TodoForm from './TodoForm';
import EditTodoForm from './EditTodoForm';
import Todo from './Todo';
import AxiosClient from '../Services/AxiosClient';
import { ClipLoader } from "react-spinners";
import AddTodoModal from './AddTodoModal';

function TodoWrapper() {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const token = sessionStorage.getItem("authToken");

    useEffect(() => {
        fetchTodos();
        // eslint-disable-next-line
    }, []);

    const fetchTodos = async () => {
        setLoading(true);
        try {
            const response = await AxiosClient.get('/todo/todos', {
                headers: { Authorization: `Bearer ${token}` }
            });
            // console.log(response)
            const receivedTodos = response.data.data;
            const finalTodos = receivedTodos.map((todo) => ({ ...todo, isEditing: false }));
            console.log('Todo list after fetching from backend', finalTodos)
            setTodos(finalTodos);
        } catch (err) {
            setError("Failed to fetch todos.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Add Todo
    const addTodo = async (title, description) => {
        setLoading(true)
        try {
            const response = await AxiosClient.post('/todo/add', {
                "title": title,
                "description": description
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log("newTodo after added", response);
            setTodos([...todos, response.data.newTodo]);
        } catch (err) {
            setError("Failed to add todo.");
            console.error(err);
        }
        finally {
            setLoading(false)
        }
    };

    const closeModal = () => {
        setShowModal(false);
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
            const newTodos = todos.filter((todo) => todo._id !== id)
            console.log('newTodos after deleted', newTodos)
            setTodos(newTodos);
        } catch (err) {
            setError("Failed to delete todo.");
            console.error(err);
        }
        finally {
            setLoading(false)
        }
    };

    // updateTodo
    const updateTodoHandler = async (updates, todo, afterUpdate = (t) => t) => {
        setLoading(true);
        try {
            const response = await AxiosClient.put(
                `/todo/update`,
                { ...todo, ...updates, todoId: todo._id },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            // console.log(response);
            const updated = afterUpdate(response.data.updatedTodo);
            console.log("updatedTodo is ", updated);

            setTodos(todos.map((todoItem) =>
                todoItem._id === todo._id ? updated : todoItem
            ));
        } catch (err) {
            setError("Failed to update todo.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Toggle Complete Todo
    const toggleComplete = (todo) => {
        updateTodoHandler({ completed: !todo.completed }, todo);
    };

    // Update Todo
    const editTodo = (newTitle, todo) => {
        updateTodoHandler({ title: newTitle }, todo, (updated) => ({
            ...updated,
            isEditing: false,
        }));
    };

    return (
        <div className="TodoWrapper">
            <h1>Todo List</h1>
            <AddTodoModal showModal={showModal} closeModal={closeModal} addTodo={addTodo} />
            {/* <TodoForm addTodo={addTodo} /> */}
            {loading &&
                <ClipLoader
                    loading={loading}
                    size={150}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />}
            {error && <p>{error}</p>}

            {todos.map((todo) =>
                <Todo
                    todo={todo}
                    deleteTodo={deleteTodo}
                    enableEditing={(id) => setTodos(todos.map((todoItem) => todoItem._id === id ? { ...todoItem, 'isEditing': true } : todoItem))}
                    toggleComplete={toggleComplete}
                />

            )}
            <button onClick={() => setShowModal(true)} className="todo-btn">Add</button>
        </div>
    );
}

export default TodoWrapper;
