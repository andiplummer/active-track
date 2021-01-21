import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navbar, HeroStats, Chart } from './index';
import {getUserWorkouts} from '../store'
import {withRouter, Route, Switch} from 'react-router-dom'

/**
 * COMPONENT
 */
class UserHome extends React.Component {
  // constructor(props) {
  //   super(props)
  // }

  // componentDidMount() {
  //   this.props.loadData(1);
  // }

  render() {
    return (
      <div className="user-home-container">
        <Navbar />
        <HeroStats />
        <Chart />
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user,
    workouts: state.workout.userWorkouts,
  };
};

// const mapDispatch = dispatch => {
//   return {
//     loadData(userId) {
//       dispatch(getUserWorkouts(userId))
//     }
//   }
// }

// export default withRouter(connect(mapState, mapDispatch)(UserHome))

export default connect(mapState)(UserHome);
