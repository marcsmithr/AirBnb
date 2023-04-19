// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(
        async (res) => {
          const data = await res.json();

          if (data && data.errors) {
            const errorsArr = Object.values(data.errors)
            setErrors(errorsArr)};
        }
      );
  };

  return (
    <div className="form-modal-main-container">
      <div className="form-header-div">
      <h1>Log In</h1>
      </div>
      <div className="form-inner-container">
      <form onSubmit={handleSubmit} className='airbnb-form'>
        <ul>
          {console.log('errors array: ', errors)}
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div className="form-input-container">
          <input
            className="form-input"
            placeholder="Username or Email"
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </div>
        <div className="form-input-container">
          <input
            className="form-input"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-button-container">
        <button type="submit" className="airbnb-button">Log In</button>
        </div>
      </form>
      </div>
      </div>
  );
}

export default LoginFormModal;
