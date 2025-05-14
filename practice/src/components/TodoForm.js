import { useState } from 'react';

function TodoForm({ addTodo }) {
    const [value, setValue] = useState("");
    const [description, setDescription] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        if (value) {
            addTodo(value, description);
            setValue("");
            setDescription("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="TodoForm">
            <div className="input-wrapper">
                <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="todo-input"
                    placeholder="Enter your todo title"
                />
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="todo-input"
                    placeholder="Enter your todo description"
                />
                <button type="submit" className="todo-btn">Add</button>
            </div>
        </form>
    );
}

export default TodoForm;
