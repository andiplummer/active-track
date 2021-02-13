import React from 'react';
import { connect } from 'react-redux';
import {
  getActivityForCurrentUser,
  addActivityData,
  getActivityHistoryTableData,
} from '../../store';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {
  formatDate,
  getTodaysDate,
  currentDateTimeForCalDatePicker,
} from '../../../utils/dateTimeUtils';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import { createMuiTheme } from "@material-ui/core";

class RecordActivityForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.onUpdateDistance = this.onUpdateDistance.bind(this);
    this.onUpdateDate = this.onUpdateDate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.setSubmitBtnState = this.setSubmitBtnState.bind(this);
    this.getDefaultState = this.getDefaultState.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this)
  }

  getDefaultState() {
    return {
      // dateAndTime: currentDateTimeForCalDatePicker(),
      distance: '',
      date: getTodaysDate(),
      // time: new Date(),
      distanceErrorText: '',
      dateErrorText: '',
      isDisabled: true,
      success: false,
      chartData: this.props.chartData,
    };
  }

  clearForm() {
    this.setState(this.getDefaultState());
  }

  onUpdateDate(event) {
    const inputDateAndTime = event.target.value;

    this.setState(
      {
        dateAndTime: inputDateAndTime,
        date: formatDate(inputDateAndTime, 'YYYY-MM-DD'),
      },
      () => this.setSubmitBtnState()
    );
  }

  handleDateChange(event) {
    this.setState({
      date: formatDate(event.target.value, 'YYYY-MM-DD'),
    });
  }

  handleTimeChange(event) {
    this.setState({
      time: event.target.value,
    });
  }

  onUpdateDistance(event) {
    const distanceStr = Number(String(Number(event.target.value).toFixed(2)));
    this.setState(
      {
        distance: distanceStr,
      },
      () => this.setSubmitBtnState()
    );
  }

  setSubmitBtnState() {
    if (
      this.state.distance === '' ||
      !this.state.distance ||
      // !this.state.dateAndTime ||
      !this.state.date
      // !this.state.time
    ) {
      this.setState({ isDisabled: true });
    } else {
      this.setState({ isDisabled: false });
    }
  }

  async handleSubmit() {
    try {
      // await this.props.addNewActivity(this.props.user.id, {
      //   date: formatDate(this.state.dateAndTime, 'YYYY-MM-DD'),
      //   time: formatDate(this.state.dateAndTime, 'LT'),
      //   distance: this.state.distance,
      // });

      await this.props.addNewActivity(this.props.user.id, {
        date: formatDate(this.state.date, 'YYYY-MM-DD'),
        // time: formatDate(new Date(), 'LT'),
        distance: this.state.distance,
      });

      await this.props.updateActivityHistoryTable(this.props.workouts);

      this.setState({ success: !this.state.success }, () =>
        setTimeout(() => {
          this.setState(this.getDefaultState());
        }, 900)
      );
    } catch (error) {
      console.log(error);
      // inline error message with button to try again or contact support
    }
  }

  render() {
    return (
      <div className="add-activity-container">
        <div className="add-new-activity-form-container">
          <form className="date-input-container">
            <TextField
              required
              id="datetime-local"
              label="Date"
              type="date"
              value={this.state.date}
              onChange={this.onUpdateDate}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                style: {fontSize: 14} 
              }}
            />
          </form>
          {/* <form className="time-input-container">
            <TextField
              id="time"
              label="Time"
              type="time"
              value={this.state.time}
              onChange={this.handleTimeChange}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                style: {fontSize: 14} 
              }}
            />
          </form> */}

          <form className="input-container">
            <TextField
              required
              id="distance-input"
              label="Distance"
              orientation="portrait"
              value={this.state.distance ? this.state.distance : ''}
              onChange={this.onUpdateDistance}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                style: {fontSize: 14 } 
              }}
            />
          </form>
        </div>

        <div className="button-container">
          <Button
            variant="contained"
            disabled={this.state.isDisabled}
            onClick={this.handleSubmit}
            style={{
              backgroundColor: this.state.success
                ? '#8cb670'
                : this.state.isDisabled
                ? '#f0f0f0'
                : '#303c6c',
              color: this.state.isDisabled ? '#adadad' : 'white',
              height: '50px',
              fontSize: '0.9em',
              padding: '10px',
              width: '100%',
            }}
          >
            {this.state.success ? <DoneOutlineIcon /> : 'Record Activity'}
          </Button>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    user: state.user,
    activity: {
      currentUser: state.activity.currentUser,
      allUsers: state.activity.allUsers,
    },
    tableData: {
      activityHistory: state.activity.tableData.activityHistory,
    },
    chartData: {
      leaderboard: state.activity.chartData.leaderboard,
      monthlyPerformance: state.activity.chartData.monthlyPerformance,
    },
  };
};

const mapDispatch = dispatch => {
  return {
    async loadInitialData(userId) {
      await dispatch(getActivityForCurrentUser(userId));
    },
    async addNewActivity(userId, body) {
      await dispatch(addActivityData(userId, body));
    },
    async updateActivityHistoryTable(data) {
      await dispatch(getActivityHistoryTableData(data));
    },
  };
};

export default connect(mapState, mapDispatch)(RecordActivityForm);
