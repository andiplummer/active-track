import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { LineChart, PieChart } from 'react-chartkick'
import 'chart.js'

const Chart = () => {
  const data = [
    { "name": "Andi", 
      data: {
        "2021-01-01": 3,
        "2021-01-02": 5,
        "2021-01-03": 7,
        "2021-01-04": 10,
        "2021-01-05": 14,
        "2021-01-06": 16,
      }  
    },
    {
      "name": "Jim",
      data: {
        "2021-01-01": 2,
        "2021-01-02": 3,
        "2021-01-03": 5,
        "2021-01-04": 7,
        "2021-01-05": 10,
        "2021-01-06": 13,
      }
    },
    {
      "name": "Jenny",
      data: {
        "2021-01-01": 2,
        "2021-01-02": 3,
        "2021-01-03": 4,
        "2021-01-04": 7,
        "2021-01-05": 11,
        "2021-01-06": 15,
      }
    },
    {
      "name": "Sue",
      data: {
        "2021-01-01": 5,
        "2021-01-02": 9,
        "2021-01-03": 15,
        "2021-01-04": 17,
        "2021-01-05": 22,
        "2021-01-06": 30,
      }
    }
  ]

  return (
    <div id="line-chart">
      <LineChart data={data} curve={false} width={'85%'} height={'500px'} colors={["#266150", "#E8CEBF", "#89b1cc", "#cc89a2"]} legend={"bottom"} />
      <div className="totals">
        <h1>Leaderboard</h1>
        <h3></h3>
      </div>
    </div>
  )
}

export default Chart;