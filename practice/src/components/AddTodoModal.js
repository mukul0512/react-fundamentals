import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function AddTodoModal({ showModal, closeModal, addTodo }) {
    const formik = useFormik({
        initialValues: {
            title: '',
            description: ''
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .required('Title is required'),
            description: Yup.string()
                .max(200, 'Description is too long')
        }),
        onSubmit: (values) => {
            addTodo(values.title, values.description);
            closeModal();
        }
    });

    if (!showModal) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Add Your Todo</h2>
                    <FontAwesomeIcon icon={faXmark} className="close-icon" onClick={closeModal} />
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <div className="input-wrapper">
                        <input
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Enter Todo Title"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="todo-input"
                        />
                        {formik.touched.title && formik.errors.title ? (
                            <div className="input-error">{formik.errors.title}</div>
                        ) : null}

                        <input
                            type="text"
                            id="description"
                            name="description"
                            placeholder="Enter Todo Description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="todo-input"
                        />
                        {formik.touched.description && formik.errors.description ? (
                            <div className="input-error">{formik.errors.description}</div>
                        ) : null}
                    </div>
                    <div className="modal-actions">
                        <button type="button" className="cancel-btn" onClick={closeModal}>Cancel</button>
                        <button type="submit" className="confirm-btn">Confirm</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddTodoModal;
