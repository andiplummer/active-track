import React from 'react';
import { connect } from 'react-redux';
import { Navbar, HeroStats, Chart } from './index';
import { getUserWorkouts, getAllUsers, getAllUserData } from '../store';

class UserHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true
    }
  }

  async componentDidMount() {
    await this.props.loadInitialData(this.props.user.id);
    this.setState({ isLoading: false })
  }

  render() {
    return (
      <div className="user-home-container">
        <Navbar />
        <HeroStats userWorkouts={this.props.workouts} />
        {this.state.isLoading === false ? <Chart /> : null}
      </div>
    );
  }
}

const mapState = state => {
  return {
    user: state.user,
    allUsers: state.data.allUsers,
    workouts: state.data.userWorkouts,
    allUserData: state.data.allUserData
  };
};

const mapDispatch = dispatch => {
  return {
    async loadInitialData(userId) {
      await dispatch(getAllUserData())
      await dispatch(getUserWorkouts(userId))
      await dispatch(getAllUsers())
    },
  };
};

export default connect(mapState, mapDispatch)(UserHome);
