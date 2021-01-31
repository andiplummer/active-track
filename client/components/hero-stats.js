import React from 'react';
import { connect } from 'react-redux';
import { getYtdMiles, getMtdMiles, getWtdMiles, getDailyMileRecord } from '../../utils/distanceUtils';
import { getCurrentYear } from '../../utils/dateTimeUtils'

const HeroStats = props => {
  const ytdMiles = getYtdMiles(props.userWorkouts)
  const mtdMiles = getMtdMiles(props.userWorkouts)
  const wtdMiles = getWtdMiles(props.userWorkouts)
  const dailyMileRecord = getDailyMileRecord(props.userWorkouts)

  return (
    <div className="hero-stats">
      <div className="stat-container">
        <h2>Year to Date</h2>
        {/* <h4>January 1, {getCurrentYear()} - Today</h4> */}
        <div className="hero-mile-count">
          <h1>{ytdMiles}</h1>
        </div>
      </div>
      <div className="vl"></div>
      <div className="stat-container">
        <h2>Month to Date</h2>
        <div className="hero-mile-count">
          <h1>{mtdMiles}</h1>
        </div>
      </div>
      <div className="vl"></div>
      <div className="stat-container">
        <h2>Week to Date</h2>
        <div className="hero-mile-count">
          <h1>{wtdMiles}</h1>
        </div>
      </div>
      {/* <div className="vl"></div> */}
      {/* <div className="stat-container">
        <h2>Daily Record</h2>
        <div className="hero-mile-count">
          <h1>{dailyMileRecord}</h1>
        </div>
      </div> */}
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
