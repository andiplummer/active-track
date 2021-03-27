import React from 'react';
import { connect } from 'react-redux';
import { Navbar, ProfileImage } from '../index';

const Profile = props => {
  return (
    <div>
      <Navbar />
      <div className="profile-container">
        <div className="profile-header">
          <ProfileImage />
          {/* <span>Welcome, {props.user.firstName}</span> */}
        </div>
        <div className="profile-stats">
            <div className="stat-card">
              <span className="miles">100.2</span>
              <span className="time">This Year</span>
            </div>
            <div className="stat-card">
              <span className="miles">35.7</span>
              <span className="time">This Month</span>
            </div>
            <div className="stat-card">
              <span className="miles">12.4</span>
              <span className="time">This Week</span>
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
    tableData: {
      activityHistory: state.activity.tableData.activityHistory,
    },
    chartData: {
      leaderboard: state.activity.chartData.leaderboard,
      monthlyPerformance: state.activity.chartData.monthlyPerformance,
    },
  };
};

const mapDispatch = dispatch => {
  return {
    async loadInitialData(userId) {
      await dispatch(getActivityForAllUsers());
      await dispatch(getActivityForCurrentUser(userId));
    },
    async loadAllUserActivityData() {
      await dispatch(getActivityForAllUsers());
    },
    async loadChallengeLeaderboardData(data) {
      await dispatch(getChallengeLeaderboardData(data));
    },
    async loadActivityHistoryTableData(data) {
      await dispatch(getActivityHistoryTableData(data));
    },
  };
};

export default connect(mapState, mapDispatch)(Profile);
