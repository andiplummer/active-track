import React from 'react';
import { connect } from 'react-redux';
import { getCurrentYear, getCurrentMonth, getFirstDayOfWeek } from '../../utils/dateTimeUtils';
import {
  getYtdMiles,
  getMtdMiles,
  getWtdMiles,
  getDailyMileRecord,
} from '../../utils/distanceUtils';

const HeroStats = props => {
  const ytdMiles = getYtdMiles(props.activity.currentUser);
  const mtdMiles = getMtdMiles(props.activity.currentUser);
  const wtdMiles = getWtdMiles(props.activity.currentUser);

  return (
    <div className="landing-hero-container">
      <div className="hero-header">
          <h1 className="header">Activity Snapshot</h1>
      </div>
      <div className="hero-stats">
      <div className="vl"></div>
        <div className="hero-stat-container">
          <div className="hero-mile-count">
            <h2>Year to Date</h2>
            <h3>Jan 1, {getCurrentYear()} - Today</h3>
            <h1>{ytdMiles.toFixed(2)}</h1>
          </div>
        </div>
        <div className="hl"></div>
        <div className="vl"></div>
        <div className="hero-stat-container">
          <div className="hero-mile-count">
            <h2>Month to Date</h2>
            <h3>{getCurrentMonth('MMM')} 1, {getCurrentYear()} - Today</h3>
            <h1>{mtdMiles.toFixed(2)}</h1>
          </div>
        </div>
        <div className="hl"></div>
        <div className="vl"></div>
        <div className="hero-stat-container">
          <div className="hero-mile-count">
            <h2>Week to Date</h2>
            <h3>{getCurrentMonth('MMM')} {getFirstDayOfWeek()}, {getCurrentYear()} - Today</h3>
            <h1>{wtdMiles.toFixed(2)}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapState = state => {
  return {
    user: state.user,
    activity: {
      currentUser: state.activity.currentUser,
      allUsers: state.activity.allUsers,
    },
  };
};

const mapDispatch = dispatch => {
  return {};
};

export default connect(mapState, mapDispatch)(HeroStats);
