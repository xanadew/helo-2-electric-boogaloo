import React from 'react';
import '../App.css';
import logo from '../assets/logo.png';

const Login = () => {
    return (
        <div className='login'>
            <div className='loginButtonWrap'>
                <img className='loginLogo' src={logo} alt='logo'/>
                <h1 className='loginHeader'>Helo</h1>
                <a href={process.env.REACT_APP_LOGIN}>
                <button className='loginButton'>Login / Register</button>
                </a>
            </div>   
        </div>
    );
};

export default Login;