// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { useDispatch } from 'react-redux';
import { login } from '../../store/session';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch()
  const handleLogin = (e) => {
    e.preventDefault();
    ;
    return dispatch(login({ credential: 'Demo-lition', password:'password' }))
  };

  return (
    <div className='nav-container'>
      <div className='left-nav-icons'>
        <NavLink exact to="/">
          <img src='https://1000logos.net/wp-content/uploads/2017/08/Airbnb-Logo.png' alt='air bnb logo' className='air-bnb-logo'/>
        </NavLink>
        <button onClick={handleLogin} className= "demo-user-button">
            <i className="fa-regular fa-id-card demo-user"></i>
        </button>
      </div>
      {isLoaded && (
        <div className='right-nav-user-icons'>
          { (sessionUser) &&
          <NavLink exact to="/create">
            <p className='air-your-home'>Airbnb your home</p>
          </NavLink>}
          <ProfileButton user={sessionUser} />
        </div>
      )}
    </div>
  );
}

export default Navigation;
