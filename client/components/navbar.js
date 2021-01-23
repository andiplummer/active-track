import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import { clearWorkoutState } from '../store'

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div className="nav">
    <div className="left-nav">
      <h1>Family Fit</h1>
    </div>
    <Link to="/activity-log" className="nav-link">Activity Log</Link>
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
      dispatch(clearWorkoutState())
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
