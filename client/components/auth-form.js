import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { auth } from '../store';
import { Link } from 'react-router-dom';

/**
 * COMPONENT
 */
const AuthForm = props => {
  const { name, displayName, handleSubmit, error, handleChangeForm } = props;

  return (
    <div className="login-container">
      <div className="header">
        <h1>
          <span className="active-style">Active</span>
          <span className="track-style">Track</span>
        </h1>
      </div>
      <div className="login-form-container">
        <form onSubmit={handleSubmit} name={name}>
          {props.name === 'signup' ? (
            <div>
              <input placeholder="First name" name="firstName" type="text" />
            </div>
          ) : null}
          {props.name === 'signup' ? (
            <div>
              <input placeholder="Last name" name="lastName" type="text" />
            </div>
          ) : null}
          <div>
            <input placeholder="Email" name="email" type="text" />
          </div>
          <div>
            <input placeholder="Password" name="password" type="password" />
          </div>
          <div className="button-container">
            <button type="submit">{displayName}</button>
          </div>
          <div className="error-container">
            {props.name === 'login' ? (
              <p>
                Don't have an account yet?{' '}
                <Link to="/signup" onClick={handleChangeForm}>
                  Signup here.
                </Link>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <Link onClick={handleChangeForm} to="/login">
                  Login here
                </Link>
              </p>
            )}
          </div>
          <div className="login-error-response">
            {(props.name === 'login' && error && error.response) ? error.response.data : ''}{' '}
          </div>
          <div className="signup-error-response"></div>
        </form>
      </div>
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error,
  };
};

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error,
  };
};

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      const firstName =
        evt.target.name === 'signup' ? evt.target.firstName.value : null;
      const lastName =
        evt.target.name === 'signup' ? evt.target.lastName.value : null;

      if (
        formName === 'signup' &&
        (!firstName ||
          !lastName ||
          !email ||
          !password ||
          firstName === '' ||
          lastName === '' ||
          email === '' ||
          password === '')
      ) {
        const errorMsgEl = document.querySelector('.signup-error-response');
        errorMsgEl.innerHTML = 'Please enter value for all fields';
      } else {
        dispatch(auth(email, password, formName, firstName, lastName));
      }
    },
    handleChangeForm(evt) {
      const errorMsgEl = document.querySelector('.signup-error-response');
      errorMsgEl.innerHTML = '';
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
};

