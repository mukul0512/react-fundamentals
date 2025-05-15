import TodoWrapper from './TodoWrapper';

function Home({ onLogout }) {
    return (
        <div>
            <div style={{ position: 'absolute', right: '50px' }}>
                <button style={{ padding: '10px', width: '150px', cursor: 'pointer', color: 'red' }} onClick={onLogout}>Logout</button>
            </div>
            <TodoWrapper />
        </div>
    );
}

export default Home;
