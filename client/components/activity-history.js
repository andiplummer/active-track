import { connect } from 'react-redux';
import React from 'react';
import { Navbar, RecordActivityForm, FadeInAnimation } from './index';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {
  getUserWorkouts,
  deleteActivity,
  updateActivityHistoryTable,
} from '../store';
import { formatDate } from '../../utils/dateTimeUtils';

class ActivityHistoryTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      chartData: [],
    };

    this.handleDeleteActivity = this.handleDeleteActivity.bind(this);
  }

  async componentDidMount() {
    await this.props.loadInitialData(this.props.user.id);
    await this.props.updateActivityHistoryTable(this.props.workouts);
    this.setState({ isLoading: false });
  }

  async handleDeleteActivity(event, id) {
    await this.props.deleteUserActivity(id, this.props.user.id);
    await this.props.updateActivityHistoryTable(this.props.workouts);
    this.setState({
      isLoading: false,
    });
  }

  render() {
    return (
      <div>
        <Navbar />

        <FadeInAnimation>
          <RecordActivityForm chartData={this.props.activityTableData} />
        </FadeInAnimation>

        <FadeInAnimation>
          <div className="table-container">
            {this.props.activityTableData.length && !this.state.isLoading ? (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Date</TableCell>
                      <TableCell align="left">Distance (miles)</TableCell>
                      <TableCell align="right"> </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.props.activityTableData.map(row => (
                      <TableRow key={row.id}>
                        <TableCell align="left">
                          {
                            <div className="date-time-container">
                              <span className="date">{formatDate(row.date, 'MM/DD/YYYY')}</span>
                              <span className="time">{row.time}</span>
                            </div>
                          }
                        </TableCell>
                        <TableCell align="left">
                          {row.distance.toFixed(2)}
                        </TableCell>
                        <TableCell align="right" component="th" scope="row">
                          <div>
                            <Button
                              onClick={event =>
                                this.handleDeleteActivity(event, row.id)
                              }
                              variant="outlined"
                              style={{
                                fontSize: '10px',
                                width: '40px',
                                padding: '2px',
                              }}
                            >
                              delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <div>
                <h1>No Activity Data</h1>
              </div>
            )}
          </div>
        </FadeInAnimation>
      </div>
    );
  }
}

const mapState = state => {
  return {
    user: state.user,
    workouts: state.activity.userWorkouts,
    activityTableData: state.activity.activityHistoryTableData,
  };
};

const mapDispatch = dispatch => {
  return {
    async loadInitialData(userId) {
      await dispatch(getUserWorkouts(userId));
    },
    async deleteUserActivity(id, userId) {
      await dispatch(deleteActivity(id, userId));
    },
    async updateActivityHistoryTable(data) {
      await dispatch(updateActivityHistoryTable(data));
    },
  };
};

export default connect(mapState, mapDispatch)(ActivityHistoryTable);
