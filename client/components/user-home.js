import React from 'react';
import { connect } from 'react-redux';
import {
  Navbar,
  Chart,
  RecordActivityForm,
  FadeInAnimation,
  ActivityNavTabs,
  Leaderboard,
} from './index';
import {
  getActivityForCurrentUser,
  getActivityForAllUsers,
  getChallengeLeaderboardData,
  getActivityHistoryTableData,
  getProgressChartData
} from '../store';
import { getCurrentMonth } from '../../utils/dateTimeUtils';

class UserHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialLoadComplete: false,
      leaderboardLoaded: false,
      activityHistoryLoaded: false,
      progressChartLoaded: false,
    };
  }

  async componentDidMount() {
    await this.props.loadInitialData(this.props.user.id);
    this.setState({ initialLoadComplete: true });
    await this.props.loadChallengeLeaderboardData(this.props.activity.allUsers);
    this.setState({ leaderboardLoaded: true });
    await this.props.loadActivityHistoryTableData(
      this.props.activity.currentUser
    );
    this.setState({ activityHistoryLoaded: true });
    await this.props.loadProgressChartData(this.props.user.id)
    this.setState({ progressChartLoaded: true })
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="user-home-container">
          <FadeInAnimation duration={2000}>
            <RecordActivityForm />
            <div className="row-container">
                <ActivityNavTabs />
              {this.state.leaderboardLoaded &&
              this.props.chartData.leaderboard.length ? (
                <Leaderboard />
              ) : (
                'no data'
              )}
            </div>
          </FadeInAnimation>
        </div>
      </div>
    );
  }
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
    async loadProgressChartData(userId) {
      await dispatch(getProgressChartData(userId))
    }
  };
};

export default connect(mapState, mapDispatch)(UserHome);
