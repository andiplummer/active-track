import { connect } from 'react-redux';
import React from 'react';
import {
  Navbar,
  RecordActivityForm,
  FadeInAnimation,
  DropdownMenu,
  ArrowIcon,
} from './index';
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
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

class ActivityHistoryTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortByDate: false,
      sortByDistance: false,
      chartData: [],
    };

    this.handleSortByDate = this.handleSortByDate.bind(this);
    this.handleSortByDistance = this.handleSortByDistance.bind(this);
  }

  async componentWillMount() {
    await this.props.loadInitialData(this.props.user.id);
    await this.props.updateActivityHistoryTable(this.props.workouts);
    this.setState({ isLoading: false });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.deletedSuccessfully !== prevProps.deletedSuccessfully) {
      await this.props.updateActivityHistoryTable(this.props.workouts);
    }
  }

  handleSortByDate() {}

  handleSortByDistance() {}

  render() {
    return (
      <div className="activity-history-page-container">
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
                      <TableCell align="left" className="date-column-header">
                        <div className="date-header">
                          <span>Date</span>
                          {this.state.sortByDate ? (
                            <ExpandLessIcon />
                          ) : (
                            <ExpandMoreIcon />
                          )}
                        </div>
                      </TableCell>
                      <TableCell
                        align="left"
                        className="distance-column-header"
                      >
                        <div className="distance-header">
                          <span>Distance</span>
                          {this.state.sortByDistance ? (
                            <ExpandLessIcon />
                          ) : (
                            <ExpandMoreIcon />
                          )}
                        </div>
                      </TableCell>
                      <TableCell align="right" className="action-column-header">
                        {' '}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.props.activityTableData.map(row => (
                      <TableRow key={row.id}>
                        {/* <div className="table-left-side"> */}
                        <TableCell align="left" className="date-column">
                          {
                            <div className="column-detail-container">
                              <span className="column-value">
                                {formatDate(row.date, 'MM/DD/YYYY')}
                              </span>
                              <span className="column-detail">{row.time}</span>
                            </div>
                          }
                        </TableCell>
                        <TableCell align="left" className="distance-column">
                          {row.distance.toFixed(2)}
                        </TableCell>
                        {/* </div> */}

                        {/* <div className="table-left-side"> */}
                        <TableCell align="right" component="th" scope="row">
                          <div>
                            {/* <Button
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
                            </Button> */}
                            <DropdownMenu rowId={row.id} />
                          </div>
                        </TableCell>
                        {/* </div> */}
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
    deletedSuccessfully: state.activity.deletedSuccessfully,
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
