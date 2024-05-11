import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import "./login.css"

function Login({setAccessToken}) {

    const navigation = useNavigate()

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    useEffect(() => {
        localStorage.clear()
    })

    const handleLogin = async () => {
        try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data)
            localStorage.setItem('accessToken', data.accessToken);
            //localStorage.setItem('userRole', data.userWithoutPass.roles)
            setAccessToken(data.accessToken)
            navigation("/")

        } else {
            console.error('Login failed');
        }
        } catch (error) {
        console.error('Error during login:', error);
        }
    };

    const goBack = () => {
        navigation("/")
    }
    
    return (
        <div className='login-component'>
            <div className='login-form'>
                <form>
                    <h2>Login</h2>

                    <label htmlFor="username"><b>Username:</b></label>
                    <input
                    type="text"
                    id="username"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter Username"></input>
                    <br></br>
                    <label htmlFor="username"><b>Password:</b></label>
                    <input
                    type="text"
                    id="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"></input>
                    <br></br>
                    <button onClick={handleLogin}>Login</button>
                </form>

                <div className='bottom-buttons-login'>
                    <button>Don't have account yet? Click here!</button>
                    <br></br>
                    <button onClick={goBack}>Go Back</button>
                </div>

            </div>

            
        </div>
    );

};

export default Login;