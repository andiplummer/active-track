import React from 'react';
import { connect } from 'react-redux';
import {
  Navbar,
  HeroStats,
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
} from '../store';

class UserHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialLoadComplete: false,
      chartDataLoaded: false,
      tableDataLoaded: false,
    };
  }

  async componentDidMount() {
    console.log('this.props', this.props)
    await this.props.loadInitialData(this.props.user.id);
    this.setState({ initialLoadComplete: true });
    await this.props.loadChallengeLeaderboardData(this.props.activity.allUsers);
    this.setState({ chartDataLoaded: true });
    await this.props.loadActivityHistoryTableData(
      this.props.activity.currentUser
    );
    this.setState({ tableDataLoaded: true });
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="user-home-container">
          <FadeInAnimation duration={2000}>
            <RecordActivityForm />
            <div className="row-container">
              {this.state.tableDataLoaded &&
              Object.keys(this.props.tableData.activityHistory).length ? (
                <ActivityNavTabs activityHistoryData={this.props.tableData.activityHistory} />
              ) : null}
              {this.state.chartDataLoaded &&
              this.props.chartData.leaderboard.length ? (
                <Leaderboard
                // leaderboardData={this.props.chartData.leaderboard}
                />
              ) : (
                'no data'
              )}
            </div>
          </FadeInAnimation>
          {/* <HeroStats userWorkouts={this.props.workouts} /> */}
          {/* {this.state.isLoading === false ? <Chart /> : null} */}
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
      // await dispatch(me());
      await dispatch(getActivityForAllUsers());
      await dispatch(getActivityForCurrentUser(userId));
    },
    // async loadCurrentUserActivityData(userId) {
    //   await dispatch(getActivityForCurrentUser(userId));
    // },
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

export default connect(mapState, mapDispatch)(UserHome);
