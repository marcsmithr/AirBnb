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
      <div>
        <NavLink exact to="/">
          <img src='https://1000logos.net/wp-content/uploads/2017/08/Airbnb-Logo.png'/>
        </NavLink>
        <button onClick={handleLogin} >Demo User</button>
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
