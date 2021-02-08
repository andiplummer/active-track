import React from 'react';
import { connect } from 'react-redux';
import { getUserWorkouts, addUserActivity, updateActivityHistoryTable } from '../store';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { formatDate, getTodaysDate, currentDateTimeForCalDatePicker } from '../../utils/dateTimeUtils';
import CheckIcon from '@material-ui/icons/Check';

class RecordActivityForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getDefaultState()
    this.onUpdateDistance = this.onUpdateDistance.bind(this);
    this.onUpdateDate = this.onUpdateDate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.setSubmitBtnState = this.setSubmitBtnState.bind(this);
    this.getDefaultState = this.getDefaultState.bind(this);
  }

  getDefaultState() {
    return {
      dateAndTime: currentDateTimeForCalDatePicker(),
      distance: '',
      date: getTodaysDate('YYYY-MM-DD'),
      time: getTodaysDate('LT'),
      distanceErrorText: '',
      dateErrorText: '',
      isDisabled: true,
      success: false,
      chartData: this.props.chartData
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
        time: formatDate(inputDateAndTime, 'LT'),
      },
      () => this.setSubmitBtnState()
    );
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
      !this.state.dateAndTime ||
      !this.state.date ||
      !this.state.time
    ) {
      this.setState({ isDisabled: true });
    } else {
      this.setState({ isDisabled: false });
    }
  }

  async handleSubmit() {
    try {
      await this.props.addNewActivity(this.props.user.id, {
        date: formatDate(this.state.dateAndTime, 'YYYY-MM-DD'),
        time: formatDate(this.state.dateAndTime, 'LT'),
        distance: this.state.distance,
      });

      await this.props.updateActivityHistoryTable(this.props.workouts)
      
      this.setState({ success: !this.state.success }, () => setTimeout(() => {
        this.setState(this.getDefaultState())
      }, 1200))
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
              type="datetime-local"
              defaultValue={this.state.dateAndTime}
              onChange={this.onUpdateDate}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                style: {fontSize: 14} 
              }}
            />
          </form>

          <form className="input-container">
            <TextField
              required
              id="distance-input"
              label="Distance"
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
              fontSize: '1em',
              padding: '10px',
              width: '100%',
            }}
          >
            {this.state.success ? <CheckIcon /> : 'Add'}
          </Button>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    user: state.user,
    workouts: state.activity.userWorkouts,
    activityTableData: state.activity.activityHistoryTableData
  };
};

const mapDispatch = dispatch => {
  return {
    async loadInitialData(userId) {
      await dispatch(getUserWorkouts(userId));
    },
    async addNewActivity(userId, body) {
      await dispatch(addUserActivity(userId, body));
    },
    async updateActivityHistoryTable(data) {
      await dispatch(updateActivityHistoryTable(data))
    }
  };
};

export default connect(mapState, mapDispatch)(RecordActivityForm);
