import React, { useState } from 'react'

function TodoForm({ addTodo }) {
    const [value, setValue] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        if (value) {
            addTodo(value);
            setValue("");
        }
    }
    return (
        <form onSubmit={handleSubmit} className="TodoForm">
            <div className='input-wrapper'>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="todo-input"
                    placeholder="Enter your todo" />
                <button type="submit" className="todo-btn">Add</button>
            </div>
        </form>
    )
}

export default TodoForm