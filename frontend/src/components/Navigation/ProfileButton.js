import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { Link, useHistory } from "react-router-dom";
import './ProfileButton.css';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory()
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.push('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div className="profile-button-container">
      <button onClick={openMenu} className='user-button'>
        <div className="user-icons-container">
          <i class="fa-solid fa-bars user-bars"></i>
          <i className="fas fa-user-circle user-icon" />
        </div>
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
          {user.username&&
            <li>{user.username}</li>
          }
          <Link to={`/${user.id}/trips`}>
            <button>
              <li>Trips</li>
            </button>
          </Link>
          {user.email &&
            <li>{user.email}</li>
          }
            <li onClick={logout} className='profile-dropdown-button'>
              Log Out
              {/* <button onClick={logout} className='logout-button'>Log Out</button> */}
            </li>
          </>
        ) : (
          <>
            <OpenModalMenuItem
              className='profile-dropdown-button'
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              className='profile-dropdown-button'
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
      </div>
  );
}

export default ProfileButton;
