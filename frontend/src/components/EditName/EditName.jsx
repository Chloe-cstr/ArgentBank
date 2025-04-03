import { useState } from "react";
import PropTypes from "prop-types";
import './editName.css';

function EditName({ initialUserName, initialFirstName, initialLastName, onSave, onCancel }) {
    const [editedUserName, setEditedUserName] = useState(initialUserName);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(editedUserName);
    };

    return (
        <form onSubmit={handleSubmit} className="edit-form">
            <div className="input-wrapper">
                <label htmlFor="username">User Name</label>
                <input 
                    type="text" 
                    id="username"
                    value={editedUserName} 
                    onChange={(e) => setEditedUserName(e.target.value)} 
                />
            </div>
            <div className="input-wrapper">
                <label htmlFor="firstname">First Name</label>
                <input 
                    type="text" 
                    id="firstname"
                    disabled
                    value={initialFirstName}  
                />
            </div>
            <div className="input-wrapper">
                <label htmlFor="name">Last Name</label>
                <input 
                    type="text" 
                    id="name"
                    disabled
                    value={initialLastName} 
                />
            </div>
            <div className="buttons">
                <button type="submit" className="sign-in-button">Save</button>
                <button type="button" className="sign-in-button" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    );
}

EditName.propTypes = {
    initialUserName : PropTypes.string.isRequired,
    initialFirstName: PropTypes.string.isRequired,
    initialLastName: PropTypes.string.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default EditName;
