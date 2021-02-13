import React, {useState} from 'react';
import { connect } from 'react-redux';
import { BarChart } from 'react-chartkick';
import 'chart.js';
import { formatDate, getTodaysDate } from '../../../utils/dateTimeUtils'
import {
  getActivityForCurrentUser,
  deleteActivity,
  getActivityHistoryTableData,
} from '../../store';


const Leaderboard = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const currentMonth = formatDate(getTodaysDate(), 'MMMM')

  return (
    <div className="leaderboard">
      <div className="header">
        <h1>LEADERBOARD</h1>
      </div>
      {
        <BarChart
          data={props.chartData.leaderboard}
          colors={['#F4976C', '#E8CEBF', '#89b1cc', '#cc89a2']}
          height={`${75 * props.chartData.leaderboard.length}px`}
        />
      }
     
    </div>
  );
};

const mapState = state => {
  return {
    user: state.user,
    activity: {
      currentUser: state.activity.currentUser,
      allUsers: state.activity.allUsers
    },
    chartData: {
      leaderboard: state.activity.chartData.leaderboard,
      monthlyPerformance: state.activity.chartData.monthlyPerformance,
    }
  };
};

const mapDispatch = dispatch => {
  return {
    async loadInitialData(userId) {
      await dispatch(getActivityForCurrentUser(userId));
    },
    async deleteUserActivity(id, userId) {
      await dispatch(deleteActivity(id, userId));
    },
    async loadActivityHistoryTableData(data) {
      await dispatch(getActivityHistoryTableData(data));
    },
  };
};

export default connect(mapState, mapDispatch)(Leaderboard);
