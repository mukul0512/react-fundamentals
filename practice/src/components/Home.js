import { useState } from 'react';
import ConfirmationDialog from './ConfirmationDialog';
import TodoWrapper from './TodoWrapper';

function Home({ onLogout }) {
    const [showLogoutConfirmationDialog, setShowLogoutConfirmationDialog] = useState(false);
    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            {showLogoutConfirmationDialog &&
                <ConfirmationDialog
                    title="Confirm Logout"
                    message="Are you sure you want to logout?"
                    primaryBtnTitle="Logout"
                    secondaryBtnTitle="Cancel"
                    closeModal={() => {
                        setShowLogoutConfirmationDialog(false)
                    }}
                    confirmAction={() => {
                        onLogout()
                    }}
                />}

            <div style={{ position: 'absolute', right: '50px' }}>
                <button style={{ padding: '10px', width: '150px', cursor: 'pointer', color: 'red' }} onClick={() => {
                    setShowLogoutConfirmationDialog(true);
                }}>Logout</button>
            </div>
            <TodoWrapper />
        </div>
    );
}

export default Home;
