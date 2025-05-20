import { useState } from 'react';
import AxiosClient from '../../services/AxiosClient';

function Auth({ onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await AxiosClient.post('/login', { email, password });
            sessionStorage.setItem('authToken', response.data.token);
            onLoginSuccess();
        } catch (err) {
            console.error('Login failed', err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button type="submit">Login</button>
        </form>
    );
}

export default Auth;
