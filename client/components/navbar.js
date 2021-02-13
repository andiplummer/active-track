import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
// import { clearState } from '../store';
import { FadeInAnimation } from './index';

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div className="nav">
    <FadeInAnimation>
      <div to="/home" className="left-nav">
        <Link to="/home" className="header-link">
          <h1>
            <span className="active-style">Active</span>
            <span className="track-style">Track</span>
          </h1>
        </Link>
      </div>
    </FadeInAnimation>
    
    {/* <Link to="/account" className="nav-link">
      Account
    </Link> */}

    <div className="logout-container">
      <a className="logout-link" href="#" onClick={handleClick}>
        Logout
      </a>
    </div>
  </div>
);

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
