import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginCard.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginCard = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async () => {
        try {
            // Make a POST request to the backend API to authenticate the user
            const response = await axios.post('http://localhost:5000/user/signin', {
                email: email,
                password: password
            });

            // Check the response status and handle accordingly
            if (response.data.status === 'SUCCESS') {
                alert('Login successful!');
                console.log('Login successful:', response.data.data);

                // Save user ID in local storage
                localStorage.setItem('userId', response.data.data.id);

                // Redirect to the home page
                navigate('/');
            } else {
                // Login failed, display error message to the user
                setErrorMessage(response.data.message);
            }
        } catch (error) {
            // Handle network errors or other errors during the login process
            console.error('Error during login:', error);
        }
    };

    return ( 
        <div className="login__card__container">
            <div className="login__card">
                <div className="login__header">
                    <h1>Login</h1>
                </div>
                <div className="login__inputs">
                    <div className="email__input__container input__container">
                        <label className="email__label input__label">Email</label>
                        <input 
                            type="email" 
                            className="email__input login__input" 
                            placeholder='example@gmail.com'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="password__input__container input__container">
                        <label className="password__label input__label">Password</label>
                        <input 
                            type="password" 
                            className="password__input login__input" 
                            placeholder='**********'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="login__button__container">
                        <button className="login__button" onClick={handleLogin}>
                            LOGIN
                        </button>
                    </div>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                </div>
            
                <div className="login__other__actions">
                    <div className="login__new__account mt-5">
                        Don't have an account? <Link to="/register">Create account</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginCard;
