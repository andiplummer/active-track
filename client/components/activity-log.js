import React from 'react';
import { connect } from 'react-redux';
import { sortAllUserDataByDate } from '../../utils/chartData';
import { getUserWorkouts, addUserActivity, deleteActivity } from '../store';
import { Navbar, ActivityHistoryTable } from './index';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import {
  getTodaysDate,
  convertDateToTimestamp,
  formatDate,
} from '../../utils/dateTimeUtils';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';

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
      dateFrom: new Date(),
      dateTo: new Date(),
      distance: 0,
      inputUnit: 'mi',
      rowData: [],
    };

    this.handleSelectUnit = this.handleSelectUnit.bind(this);
    this.handleInputDistance = this.handleInputDistance.bind(this);
    this.handleSelectStartDate = this.handleSelectStartDate.bind(this);
    this.handleSelectEndDate = this.handleSelectEndDate.bind(this);
    this.handleLogNewActivity = this.handleLogNewActivity.bind(this);
    this.formatRowData = this.formatRowData.bind(this);
    this.createData = this.createData.bind(this);
    this.handleDeleteActivity = this.handleDeleteActivity.bind(this)
  }

  async componentDidMount() {
    await this.props.loadInitialData(this.props.user.id);
    this.formatRowData(this.props.workouts);
    this.setState({ isLoading: false });
  }

  async handleSelectUnit(event) {
    await this.setState({ inputUnit: event.target.value });
  }

  async handleSelectStartDate(event) {
    await this.setState({ dateFrom: event.target.value });
  }

  async handleSelectEndDate(event) {
    await this.setState({ dateTo: event.target.value });
  }

  async handleInputDistance(event) {
    await this.setState({ distance: event.target.value });
  }

  async handleLogNewActivity(event) {
    event.preventDefault();
    await this.props.addNewActivity(this.props.user.id, {
      dateFrom: this.state.dateFrom,
      dateTo: this.state.dateTo,
      distance: this.state.distance,
    });

    this.formatRowData(this.props.workouts);
    this.setState({ distance: 0 });
  }

  async handleDeleteActivity(event, id) {
    event.preventDefault()
    await this.props.deleteUserActivity(id, this.props.user.id)
    this.formatRowData(this.props.workouts)
  }

  createData(deleteIcon, distance, dateFrom, dateTo, id) {
    return { deleteIcon, distance, dateFrom, dateTo, id };
  }

  formatRowData(userData) {
    const sortedData = sortAllUserDataByDate(userData).reverse();
    const rows = sortedData.map(dataPoint => {
      return this.createData(
        <div>
          <Button onClick={(event) => this.handleDeleteActivity(event, dataPoint.id)} variant="outlined" style={{fontSize: "10px", width: "40px", padding: "2px"}}>delete</Button>
        </div>,
        dataPoint.distance,
        dataPoint.dateFrom,
        dataPoint.dateTo,
        dataPoint.id
      );
    });

    this.setState({ rowData: rows });
  }

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
                    label="Date From"
                    type="date"
                    className="start-date-picker"
                    defaultValue={this.state.dateFrom}
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
                    label="Date To"
                    type="date"
                    className="end-date-picker"
                    defaultValue={this.state.dateTo}
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

              <div className="icon-container">
                <Button
                  variant="contained"
                  onClick={this.handleLogNewActivity}
                  style={{
                    backgroundColor: '#F4976C',
                    color: 'white',
                    fontSize: '1.2em',
                    fontFamily: 'mom-cake-thin',
                  }}
                >
                  Add
                </Button>
              </div>
            </div>
          </div>
          <div></div>
        </div>

        <div>
          {/* <ActivityHistoryTable /> */}
          <div className="table-container">
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell> </TableCell>
                    <TableCell align="center">Date</TableCell>
                    <TableCell align="center">Miles</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.rowData.length
                    ? this.state.rowData.map(row => (
                        <TableRow key={row.id}>
                          <TableCell align="center" component="th" scope="row">
                            {row.deleteIcon}
                          </TableCell>
                          <TableCell align="left">
                            {row.dateFrom === row.dateTo
                              ? formatDate(row.dateFrom, 'YYYY-MM-DD', 'LL')
                              : `${formatDate(
                                  row.dateFrom,
                                  'YYYY-MM-DD',
                                  'LL'
                                )} - ${formatDate(
                                  row.dateTo,
                                  'YYYY-MM-DD',
                                  'LL'
                                )}`}
                          </TableCell>
                          <TableCell align="left">{row.distance}</TableCell>
                        </TableRow>
                      ))
                    : null}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
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
    async addNewActivity(userId, body) {
      await dispatch(addUserActivity(userId, body));
    },
    async deleteUserActivity(id, userId) {
      await dispatch(deleteActivity(id, userId))
    },
  };
};

export default connect(mapState, mapDispatch)(ActivityLog);
