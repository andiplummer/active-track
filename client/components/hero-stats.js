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
  // const ytdMiles = getYtdMiles(props.userWorkouts);
  // const mtdMiles = getMtdMiles(props.userWorkouts);
  // const wtdMiles = getWtdMiles(props.userWorkouts);
  // const dailyMileRecord = getDailyMileRecord(props.userWorkouts);

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
            <h1>275.12</h1>
          </div>
        </div>
        <div className="hl"></div>
        <div className="vl"></div>
        <div className="hero-stat-container">
          <div className="hero-mile-count">
            <h2>Month to Date</h2>
            <h3>{getCurrentMonth('MMM')} 1, {getCurrentYear()} - Today</h3>
            <h1>97.02</h1>
          </div>
        </div>
        <div className="hl"></div>
        <div className="vl"></div>
        <div className="hero-stat-container">
          <div className="hero-mile-count">
            <h2>Week to Date</h2>
            <h3>{getCurrentMonth('MMM')} {getFirstDayOfWeek()}, {getCurrentYear()} - Today</h3>
            <h1>7.40</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapState = state => {
  return {};
};

const mapDispatch = dispatch => {
  return {};
};

export default connect(mapState, mapDispatch)(HeroStats);
