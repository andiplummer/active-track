import React from 'react'
import {connect} from 'react-redux'
import {
  Navbar,
} from './index';

const Account = (props) => {
  return (
    <div>
      <Navbar />
      <div>
        <h1>Account</h1>
      </div>
    </div>
  )
}

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

export default connect(mapState, mapDispatch)(Account)
