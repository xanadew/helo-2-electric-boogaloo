import React from 'react';
import {Link} from 'react-router-dom';
import home from '../assets/home.png';
import search from '../assets/search.png';
import '../App.css';

const Nav = (props) => {
        return (
            <div className='navBody'>
                <div className='nav1'>
                    <p>Helo</p>
                    <div className='placeHolderNav'/>
                    <Link to='/dash'><img className='homeIcon' src={home} alt='home'/></Link>
                    <div className='placeHolderNav'/>
                    <Link to='/search'><img className='searchIcon' src={search} alt='search'/></Link>
                </div>
                <div className='nav2'>
                <p>{props.children}</p>
                </div>
                <div className='nav2'>
                    <a href='http://localhost:1337/auth/logout' style={{textDecoration: 'none', color: 'white'}}>
                        <p>Logout</p>
                    </a>
                </div>
            </div>
        );
}

export default Nav;