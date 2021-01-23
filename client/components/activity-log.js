import React from 'react';
import { connect } from 'react-redux';
import { sortAllUserDataByDate } from '../../utils/chartData';
import { getUserWorkouts, getAllUsers, getAllUserData } from '../store';
import { Navbar, HeroStats, Chart } from './index';

class ActivityLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  async componentDidMount() {
    await this.props.loadInitialData(this.props.user.id);
    this.setState({ isLoading: false });
  }

  render() {
    return (
      <div>
        <Navbar />
        <h1>Activity Log</h1>
        <table>
          <tr>
            <th>Miles</th>
            <th>Date</th>
          </tr>
          <tr>
            <td>3.32</td>
            <td>Jan 1</td>
          </tr>
        </table>

        {this.state.isLoading
          ? null
          : sortAllUserDataByDate(this.props.workouts).map(workoutEntry => (
              <tr>
                <td>{workoutEntry.distance}</td>
                <td>{workoutEntry.dateTo}</td>
              </tr>
            ))}
      </div>
    );
  }
}

const mapState = state => {
  return {
    user: state.user,
    workouts: state.data.userWorkouts,
  };
};

const mapDispatch = dispatch => {
  return {
    async loadInitialData(userId) {
      await dispatch(getUserWorkouts(userId));
    },
  };
};

export default connect(mapState, mapDispatch)(ActivityLog);
