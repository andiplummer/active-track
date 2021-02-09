import React, {useState} from 'react';
import { connect } from 'react-redux';
import { BarChart } from 'react-chartkick';
import 'chart.js';
import { formatDate, getTodaysDate } from '../../../utils/dateTimeUtils'


const Leaderboard = ({ chartData }) => {
  const [isLoading, setIsLoading] = useState(false)
  const currentMonth = formatDate(getTodaysDate(), 'MMMM')

  return (
    <div className="leaderboard">
      <div className="header">
        <h1>{currentMonth.toUpperCase()} LEADERBOARD</h1>
      </div>
      {
        Object.keys(chartData.leaderboard).length ? 
        <BarChart
          data={chartData.leaderboard}
          colors={['#F4976C', '#E8CEBF', '#89b1cc', '#cc89a2']}
          height={`${75 * chartData.leaderboard.length}px`}
        />
      : 'no data'
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

export default connect(mapState)(Leaderboard);
