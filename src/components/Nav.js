import React from 'react';
import {Link} from 'react-router-dom';
import home from '../assets/home.png';
import search from '../assets/search.png';

const Nav = () => {
        return (
            <div className='nav'>
                <div className='leftIcons'>
                    <h2 className='heloTitle'>Helo</h2>
                    <Link to='/dash'><img className='homeIcon' src={home} alt='home'/></Link>
                    <Link to='/search'><img className='searchIcon' src={search} alt='search'/></Link>
                </div>
                <h3 className='dashTitle'>Dashboard</h3>
                <a href={'http://localhost:3000/#/'}>
                    <button className='navLogout'>Logout</button>
                </a>
            </div>
        );
}

export default Nav;