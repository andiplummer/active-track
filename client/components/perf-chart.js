import React from 'react';
import { connect } from 'react-redux';
import { LineChart, BarChart } from 'react-chartkick';
import 'chart.js';
import {
  formatCurrentMonthSingleParticipantDataForLineChart,
  formatUserDataForBarChart,
} from '../../utils/chartData';
import {getTodaysDate} from '../../utils/dateTimeUtils'

const Chart = props => {
  const lineChartData = formatCurrentMonthSingleParticipantDataForLineChart(
    props.workouts
  );
  
  const barChartData = formatUserDataForBarChart(
    props.allUsers,
    props.allUserData
  );

  return (
    <div className="perf-chart-section">
      <div className="chart-container">
        <div className="chart-header">
          <h1>Activity Data</h1>
          <h2>January 1, 2021 - Today</h2>
          {/* <div className="filters">
            <div className="disabled">Week</div>
            <div className="enabled">Month</div>
            <div className="disabled">Year</div>
          </div> */}
        </div>

        <div className="chart">
          <LineChart
            data={lineChartData}
            curve={false}
            width={'95%'}
            height={'450px'}
            colors={['#89b1cc', '#266150']}
            legend={'top'}
          />
        </div>
      </div>
      <div className="leaderboard">
        <h1>Leaderboard</h1>
        <BarChart
          data={barChartData}
          colors={['#266150', '#E8CEBF', '#89b1cc', '#cc89a2']}
          height={`${75 * barChartData.length}px`}
        />
      </div>
    </div>
  );
};

const mapState = state => {
  return {
    user: state.user,
    allUsers: state.data.allUsers,
    workouts: state.data.userWorkouts,
    allUserData: state.data.allUserData,
  };
};

export default connect(mapState)(Chart);
