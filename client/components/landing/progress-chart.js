import React, {useState} from 'react';
import { connect } from 'react-redux';
import { LineChart, } from 'react-chartkick';
import 'chart.js';

const Chart = props => {
  return (
    <div className="chart-container">
        <LineChart
          data={props.chartData}
          curve={false}
          width={'95%'}
          height={'450px'}
          colors={['#F4976C', '#B4DFE5']}
          legend={'bottom'}
        />
    </div>
  );
};


export default Chart
