import React from 'react';
import { connect } from 'react-redux';
import {
  getYtdMiles,
  getMtdMiles,
  getWtdMiles,
  getDailyMileRecord,
} from '../../utils/distanceUtils';
import { getCurrentYear, getCurrentMonth } from '../../utils/dateTimeUtils';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import {
  CategoryProvider,
  CategoryTitle,
  CategoryItem,
} from '@mui-treasury/components/menu/category';
import {
  FadeInAnimation,
} from './index';

const HeroStats = props => {
  const ytdMiles = getYtdMiles(props.userWorkouts);
  const mtdMiles = getMtdMiles(props.userWorkouts);
  const wtdMiles = getWtdMiles(props.userWorkouts);
  const dailyMileRecord = getDailyMileRecord(props.userWorkouts);

  // const firstDayOfMonth = formatDate(`${getCurrentMonth()-01-getCurrentYear()}`, 'MM Do')

  return (
    <div className="hero-stats">
      <FadeInAnimation>
      <Box minWidth={'100%'}>
        <Grid container id="grid-container">
          <Grid item xs="auto">
            <CategoryProvider>
              <CategoryItem>Year to Date</CategoryItem>
              <CategoryItem>Jan 1 - Today</CategoryItem>
              <CategoryTitle>{ytdMiles} miles</CategoryTitle>
            </CategoryProvider>
          </Grid>
          <Grid item xs="auto">
            <CategoryProvider>
              <CategoryItem>Month to Date</CategoryItem>
              <CategoryItem>{getCurrentMonth().split(' ')[0]} 1 - Today</CategoryItem>
              <CategoryTitle>{mtdMiles} miles</CategoryTitle>
            </CategoryProvider>
          </Grid>
        </Grid>
      </Box>
      </FadeInAnimation>
      {/* <div className="stat-container">
        <h2>Year to Date</h2>
        <h4>January 1, {getCurrentYear()} - Today</h4>
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
      </div> */}
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
