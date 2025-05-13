import TodoWrapper from './TodoWrapper';

function Home({ onLogout }) {
    return (
        <div>
            <TodoWrapper />
            <button onClick={onLogout}>Logout</button>
        </div>
    );
}

export default Home;
