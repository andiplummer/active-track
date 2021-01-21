import React from 'react'
import {connect} from 'react-redux'

const HeroStats = () => (
  <div className="hero-stats">
    <div className="stat-container">
      <h2>Year to Date</h2>
      <div className="hero-mile-count">
        <h1>103.56</h1>
      </div>
    </div>
    <div className="vl"></div>
    <div className="stat-container">
      <h2>Month to Date</h2>
      <div className="hero-mile-count">
        <h1>60.32</h1>
      </div>
    </div>
    <div className="vl"></div>
    <div className="stat-container">
      <h2>Week to Date</h2>
      <div className="hero-mile-count">
        <h1>15.00</h1>
      </div>
    </div>
  </div>
)

const mapState = state => {
  return {
    
  }
}

const mapDispatch = dispatch => {
  return {
    
  }
}

export default connect(mapState, mapDispatch)(HeroStats)