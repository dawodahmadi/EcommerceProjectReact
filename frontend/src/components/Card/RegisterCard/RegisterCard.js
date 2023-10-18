import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import './RegisterCard.css';
import axios from 'axios';

const RegisterCard = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); 

    const handleRegister = async () => {
        try {
            // Make a POST request to the backend API to register the user
            const response = await axios.post('http://localhost:5000/user/signup', {
                name: name,
                email: email,
                password: password,
                dateOfBirth: dateOfBirth
            });

            // Check the response status and handle accordingly
            if (response.data.status === 'SUCCESS') {
                // Registration successful, show alert and redirect to login page
                alert('Registration successful! Please login to continue.');
                // Redirect the user to the login page upon successful registration
                navigate('/')
            } else {
                // Registration failed, set error message for display
                setErrorMessage(response.data.message);
            }
        } catch (error) {
            // Handle network errors or other errors during the registration process
            console.error('Error during registration:', error);
            // Set error message for display
            setErrorMessage('An error occurred during registration. Please try again later.');
        }
    };

    return (
        <div className="register__card__container">
            <div className="register__card">
                <div className="register__header">
                    <h1>Create Account</h1>
                </div>
                <div className="register__inputs">
                    <div className="name__input__container reg__input__container">
                        <label className="name__label input__label">Name</label>
                        <input 
                            type="text" 
                            className="name__input register__input" 
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="email__input__container reg__input__container">
                        <label className="email__label input__label">Email</label>
                        <input 
                            type="email" 
                            className="email__input register__input" 
                            placeholder='example@gmail.com'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="password__input__container reg__input__container">
                        <label className="password__label input__label">Password</label>
                        <input 
                            type="password" 
                            className="password__input register__input" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="dob__input__container reg__input__container">
                        <label className="dob__label input__label">Date of Birth</label>
                        <input 
                            type="date" 
                            className="dob__input register__input" 
                            value={dateOfBirth}
                            onChange={(e) => setDateOfBirth(e.target.value)}
                        />
                    </div>
                    <div className="register__button__container">
                        <button className="register__button" onClick={handleRegister}>
                            Create Account
                        </button>
                    </div>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                </div>
                <div className="register__other__actions">
                    <div className="register__login__account">
                        Already have an account? <Link to="/">Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterCard;
