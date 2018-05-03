import React from 'react';
import '../App.css';
import logo from '../assets/logo.png';

const Login = () => {
    return (
        <div className='authBody'>
            <div className='heloBox'>
                <div className='heloLogo'>
                    <img className='heloImg' src={logo} alt='logo'/>
                <h1 className='logoText'>Helo</h1>
                </div>
                <div className='authLinkContainer'>
                    <div className='authLinks'>
                        <a href='http://localhost:1337/auth' className='authLinkText'>Login / Register</a>
                    </div>
                </div>
            </div>   
        </div>
    );
};

export default Login;