import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import "./register.css"

function Register() {

    const navigation = useNavigate()

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [location, setLocation] = useState('');
    const [password, setPassword] = useState('');

    const handgleRegister = () => {
        navigation("/")
    }

    const goBack = () => {
        navigation("/")
    }
    
    return (
        <div className='register-component'>
            <div className='register-form'>
                <form>
                    <h2>Registration</h2>

                    <label><b>Name:</b></label>
                    <input
                    type="text"
                    id="name"
                    required
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Name"></input>
                    <br></br>
                    <label><b>Surname:</b></label>
                    <input
                    type="text"
                    id="surname"
                    required
                    onChange={(e) => setSurname(e.target.value)}
                    placeholder="Enter Surname"></input>
                    <br></br>
                    <label><b>Email:</b></label>
                    <input
                    type="text"
                    id="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Username"></input>
                    <br></br>
                    <label><b>Username:</b></label>
                    <input
                    type="text"
                    id="username"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter Username"></input>
                    <br></br>
                    <label><b>Password:</b></label>
                    <input
                    type="hidden"
                    id="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"></input>
                    <br></br>
                    <label><b>Where do you live?:</b></label>
                    <input
                    type="text"
                    id="location"
                    required
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter Location Name"></input>
                    <br></br>
                    <button onClick={handgleRegister}>Register</button>
                    
                </form>

                <div className='bottom-buttons-register'>
                    <button>Don't have account yet? Click here!</button>
                    <br></br>
                    <button onClick={goBack}>Go Back</button>
                </div>

            </div>

            
        </div>
    );

};

export default Register;