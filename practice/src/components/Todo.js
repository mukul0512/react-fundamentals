import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function Todo({ todo, deleteTodo, enableEditing, toggleComplete }) {
    return (
        <div style={styles.container}>
            <div>
                <p>{todo.title}</p>
                <p style={{ display: 'flex', color: 'gray', fontSize: 13 }}>{todo.description}</p>
            </div>
            <div style={styles.buttonContainer}>
                <FontAwesomeIcon style={{ ...styles.actionButtonStyle, color: 'green' }} className="edit-icon" icon={faPenToSquare} onClick={() => enableEditing(todo._id)} />
                <FontAwesomeIcon style={{ ...styles.actionButtonStyle, color: 'red' }} className="delete-icon" icon={faTrash} onClick={() => deleteTodo(todo._id)} />
            </div>
        </div>

    )
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        border: '1px solid white',
        borderRadius: '5px',
        padding: '5px 15px',
        marginTop: '15px',
        backgroundColor: 'white',
        justifyContent: 'space-between'
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    actionButtonStyle: {
        marginLeft: '20px',
    }
}

export default Todo;

// Should We use JSX for styling always ? 