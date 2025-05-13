import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function Todo({ todo, deleteTodo, enableEditing, toggleComplete }) {
    return (
        <div className="Todo">
            <p className={`${todo.completed ? "completed" : "incompleted"}`} onClick={() => toggleComplete(todo)} >{todo.title}</p>
            <div>
                <FontAwesomeIcon className="edit-icon" icon={faPenToSquare} onClick={() => enableEditing(todo._id)} />
                <FontAwesomeIcon className="delete-icon" icon={faTrash} onClick={() => deleteTodo(todo._id)} />
            </div>
        </div>
    )
}

export default Todo;