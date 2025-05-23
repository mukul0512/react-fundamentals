import { useState, useEffect } from 'react';
import Todo from './Todo';
import AxiosClient from '../services/AxiosClient';
import { ClipLoader } from "react-spinners";
import AddTodoModal from './AddTodoModal';
import ConfirmationDialog from './ConfirmationDialog';
import EditTodoModal from './EditTodoModal';

function TodoWrapper() {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedTodoId, setSelectedTodoId] = useState(null);
    // Property - if `true`: will render Confirmation dialog. 
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState(null);

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
            console.error(err);
            alert(err)
        } finally {
            setLoading(false);
        }
    };

    // Add Todo
    const addTodo = async (title, description) => {
        setLoading(true)
        console.log('Token', token)
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
            alert(err);
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
    const deleteTodo = async () => {
        setLoading(true)
        try {
            await AxiosClient.delete('/todo/delete', {
                headers: { Authorization: `Bearer ${token}` },
                data: {
                    "todoId": selectedTodoId
                }
            });
            const newTodos = todos.filter((todo) => todo._id !== selectedTodoId)
            console.log('newTodos after deleted', newTodos)
            setTodos(newTodos);
        } catch (err) {
            alert(err)
            console.error(err);
        }
        finally {
            setLoading(false)
        }
    };

    const showDeleteConfirmationModel = (id) => {
        setSelectedTodoId(id)
        console.log("showing ", id);

        setShowDeleteModal(true)
    }

    const closeDeleteConfirmationModel = () => {
        setSelectedTodoId(null)
        setShowDeleteModal(false)
    }

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
            alert(err)
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Toggle Complete Todo
    const toggleComplete = (todo) => {
        updateTodoHandler({ completed: !todo.completed }, todo);
    };

    // Close Edit Todo Modal
    const closeEditTodoModal = () => {
        setSelectedTodo(null);
    }

    return (
        <div style={{ width: '100%', height: '100%', justifyContent: 'center', display: 'flex', backgroundColor: 'green' }}>
            <div className="TodoWrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h1>Todo List</h1>
                <AddTodoModal showModal={showModal} closeModal={closeModal} addTodo={addTodo} />
                {
                    showDeleteModal &&
                    <ConfirmationDialog
                        title="Confirm Delete"
                        message="Are you sure you want to delete this todo?"
                        primaryBtnTitle="Delete"
                        secondaryBtnTitle="Cancel"
                        closeModal={closeDeleteConfirmationModel}
                        confirmAction={() => {
                            deleteTodo()
                            closeDeleteConfirmationModel()
                        }}
                    />
                }

                {selectedTodo && (
                    <EditTodoModal
                        todo={selectedTodo}
                        editTodo={(updatedTodo) => {
                            updateTodoHandler({ title: updatedTodo.title, description: updatedTodo.description }, updatedTodo);
                            closeEditTodoModal();
                        }}
                        closeEditTodoModal={closeEditTodoModal}
                    />
                )}

                {
                    todos.length === 0 &&
                    <div>
                        <h2 style={{ color: 'white' }}> There is no TODO available</h2>
                    </div>
                }
                {loading ?
                    <ClipLoader
                        loading={loading}
                        size={100}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                        color='white'
                    /> :
                    < div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                        {todos.map((todo) =>
                            <Todo
                                todo={todo}
                                deleteTodo={showDeleteConfirmationModel}
                                enableEditing={(id) => {
                                    const todoToEdit = todos.find((t) => t._id === id);
                                    setSelectedTodo(todoToEdit);
                                }}
                                toggleComplete={toggleComplete}
                            />
                        )}
                        <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                            <button onClick={() => setShowModal(true)} className="todo-btn">Add</button>
                        </div>
                    </div>}
            </div >
        </div>
    );
}

export default TodoWrapper;
