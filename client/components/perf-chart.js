import React from 'react';
import { connect } from 'react-redux';
import { LineChart, BarChart } from 'react-chartkick';
import 'chart.js';
import {
  formatCurrentMonthSingleParticipantDataForLineChart,
  formatUserDataForBarChart,
  getTargetActivityData,
} from '../../utils/chartData';
import { formatDate } from '../../utils/dateTimeUtils';

const Chart = props => {
  const lineChartData = props.myActivity.length ? formatCurrentMonthSingleParticipantDataForLineChart(
    props.myActivity
  ) : [
    {
      name: 'Target activity to reach 100 miles',
      data: getTargetActivityData(),
    },
  ]

  const firstDataPoint = props.myActivity.length ? Object.keys(lineChartData[1].data)[0] : null;

  const barChartData = formatUserDataForBarChart(
    props.allUsers,
    props.allUserData
  );

  return (
    <div className="perf-chart-section">
        <div className="chart-container">
          <div className="chart-header">
            <h1>Activity Data</h1>
            <h2>{firstDataPoint ? formatDate(firstDataPoint, 'YYYY-MM-DD', 'LL') - Today : `Record activity to view your progress`}</h2>
          </div>

          <div className="chart">
            <LineChart
              data={lineChartData}
              curve={false}
              width={'95%'}
              height={'450px'}
              colors={['#F4976C', '#B4DFE5']}
              legend={'top'}
            />
          </div>
        </div>
        <div className="leaderboard">
          <h1>Leaderboard</h1>
          <BarChart
            data={barChartData}
            colors={['#F4976C', '#E8CEBF', '#89b1cc', '#cc89a2']}
            height={`${75 * barChartData.length}px`}
          />
        </div>
    </div>
  );
};

const mapState = state => {
  return {
    user: state.user,
    allUsers: state.activity.allUsers,
    myActivity: state.activity.userWorkouts,
    allUserData: state.activity.allUserData,
  };
};

export default connect(mapState)(Chart);
