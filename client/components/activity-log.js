import React from 'react';
import { connect } from 'react-redux';
import { sortAllUserDataByDate } from '../../utils/chartData';
import { getUserWorkouts, getAllUsers, getAllUserData } from '../store';
import { Navbar, HeroStats, Chart } from './index';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 10px 10px 12px',
    width: '100%',
    height: '20px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

class ActivityLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      startDate: new Date(),
      endDate: new Date(),
      distance: 0,
      inputUnit: 'mi',
    };

    this.handleSelectUnit = this.handleSelectUnit.bind(this);
    this.handleInputDistance = this.handleInputDistance.bind(this);
    this.handleSelectStartDate = this.handleSelectStartDate.bind(this);
    this.handleSelectEndDate = this.handleSelectEndDate.bind(this);
    this.handleLogNewActivity = this.handleLogNewActivity.bind(this);
  }

  async componentDidMount() {
    await this.props.loadInitialData(this.props.user.id);
    this.setState({ isLoading: false });
  }

  async handleSelectUnit(event) {
    await this.setState({ inputUnit: event.target.value });
    console.log('updated state here', this.state);
  }

  async handleSelectStartDate(event) {
    await this.setState({ startDate: event.target.value });
    console.log('updated state here', this.state);
  }

  async handleSelectEndDate(event) {
    await this.setState({ endDate: event.target.value });
    console.log('updated state here', this.state);
  }

  async handleInputDistance(event) {
    await this.setState({ distance: event.target.value });
    console.log('updated state here', this.state);
  }

  async handleLogNewActivity(event) {}

  render() {
    return (
      <div>
        <Navbar />
        <div className="activity-log-container">
          <div className="log-new-activity-container">
            <h1>Log new activity</h1>
            <hr />
            <br />
            <div className="log">
              <div className="form-container">
                <form noValidate>
                  <TextField
                    id="date"
                    label="Start Date"
                    type="date"
                    className="start-date-picker"
                    defaultValue={this.state.startDate}
                    onChange={this.handleSelectStartDate}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </form>
              </div>

              <div className="form-container">
                <form>
                  <TextField
                    id="date"
                    label="End Date"
                    type="date"
                    className="end-date-picker"
                    defaultValue={this.state.endDate}
                    onChange={this.handleSelectEndDate}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </form>
              </div>

              <div className="input-container">
                <FormControl className="distance-input">
                  <InputLabel>Distance (miles)</InputLabel>
                  <BootstrapInput
                    onChange={this.handleInputDistance}
                    value={this.state.distance}
                    type="number"
                  />
                </FormControl>
              </div>
              {/* <div className="input-container">
                <FormControl className="unit-input">
                  <InputLabel>Unit</InputLabel>
                  <Select
                    defaultValue={this.state.inputUnit}
                    value={this.state.inputUnit}
                    onChange={this.handleSelectUnit}
                    input={<BootstrapInput />}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="mi">mi</MenuItem>
                    <MenuItem value="km">km</MenuItem>
                  </Select>
                </FormControl>
              </div> */}

              <div className="icon-container">
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: '#F4976C',
                    color: 'white',
                    fontSize: '1.2em',
                    fontFamily: 'mom-cake-thin',
                  }}
                >
                  Add
                </Button>
                {/* <Fab onClick={this.handleLogNewActivity} style={{ backgroundColor: '#e8cebf' }} size="small" className="add-icon">
                  <AddIcon style={{ color: 'white' }} />
                </Fab> */}
              </div>
            </div>
          </div>
          <div>
            
          </div>
        </div>

        {/* {this.state.isLoading
          ? null
          : sortAllUserDataByDate(this.props.workouts).map(workoutEntry => (
              <tr>
                <td>{workoutEntry.distance}</td>
                <td>{workoutEntry.dateTo}</td>
              </tr>
            ))} */}
      </div>
    );
  }
}

const mapState = state => {
  return {
    user: state.user,
    workouts: state.activity.userWorkouts,
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
