import { useState } from 'react';

function EditTodoModal({ editTodo, todo, onCancel }) {
    const [title, setTitle] = useState(todo.title);
    const [description, setDescription] = useState(todo.description);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedTodo = { ...todo, title, description };
        editTodo(updatedTodo);
    };
    return (
        <form onSubmit={handleSubmit} className="TodoForm">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="todo-input"
                placeholder="Edit title" />
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="todo-input"
                placeholder="Edit description" />
            <button onClick={onCancel} type="submit" className="todo-btn">Cancel</button>
            <button type="submit" className="todo-btn">Save</button>
        </form>
    )
}

export default EditTodoModal;