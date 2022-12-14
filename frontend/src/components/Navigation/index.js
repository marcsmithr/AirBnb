// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='nav-container'>
      <div>
        <NavLink exact to="/">
          <img src='https://1000logos.net/wp-content/uploads/2017/08/Airbnb-Logo.png'/>
        </NavLink>
      </div>
      {isLoaded && (
        <div className='nav-user-div'>
          <NavLink exact to="/create">
            <p>Airbnb your home</p>
          </NavLink>
          <ProfileButton user={sessionUser} />
        </div>
      )}
    </div>
  );
}

export default Navigation;
