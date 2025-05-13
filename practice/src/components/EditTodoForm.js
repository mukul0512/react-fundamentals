import { useState } from 'react';

function EditTodoForm({ editTodo, todo }) {
    const [value, setValue] = useState(todo.title);

    const handleSubmit = (e) => {
        e.preventDefault();
        editTodo(value, todo)
    }
    return (
        <form onSubmit={handleSubmit} className="TodoForm">
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="todo-input"
                placeholder="Update Task..." />
            <button type="submit" className="todo-btn">Save</button>
        </form>
    )
}

export default EditTodoForm;