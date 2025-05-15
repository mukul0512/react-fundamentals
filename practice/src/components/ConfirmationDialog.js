import "../App.css";
const ConfirmationDialog = () => {
    return (

        <div style={{ backgroundColor: 'var(--overlay-color)', width: '100%', height: '100%', display: 'flex', position: 'absolute', justifyContent: 'center', alignItems: 'center', top: 0 }}>
            <div style={styles.container}>
                <div style={styles.closeBtnContainer}>
                    <button style={styles.closeBtn}>X</button>
                </div>

                <div style={styles.content}>
                    <div style={styles.title}>
                        <h3>Title</h3>
                    </div>
                    <div style={styles.message}>
                        <p>Are you sure you want to delete this todo?</p>
                    </div>
                </div>

                <div style={styles.actionBtns}>
                    <button style={styles.secondaryBtn}>No</button>
                    <button style={styles.primaryBtn}>Yes</button>
                </div>
            </div >
        </div>
    )
}


const styles = {
    container: {
        border: '1px solid black',
        backgroundColor: 'red',
        width: '446px',
        height: '225px'
    },
    closeBtnContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginRight: '10px',
        paddingTop: '10px'
    },
    closeBtn: {
        fontSize: '20px',
        width: '50px',
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        color: 'white'
    },
    content: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'column'
    },
    title: {
        padding: '0 25px',
        color: 'white'
    },
    message: {
        padding: '15px 25px',
        color: 'white'
    },
    actionBtns: {
        margin: '25px 25px',
        display: 'flex',
        justifyContent: 'space-between'
    },
    secondaryBtn: {
        width: '120px',
        height: '40px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '20px'
    },
    primaryBtn: {
        width: '120px',
        height: '40px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '20px'
    }
}

export default ConfirmationDialog;