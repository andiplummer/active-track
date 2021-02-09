import { connect } from 'react-redux';
import React, {useState, useEffect} from 'react';
import {
  Navbar,
  RecordActivityForm,
  FadeInAnimation,
  DropdownMenu,
  Footer
} from '../index';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {
  getActivityForCurrentUser,
  deleteActivity,
  getActivityHistoryTableData,
} from '../../store';
import { formatDate } from '../../../utils/dateTimeUtils';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

const ActivityHistoryTable = (props) => {

  const [sortByDate, setSortByDate] = useState(false)
  const [sortByDistance, setSortByDistance] = useState(false)
  const [loadingState, setLoadingState] = useState(true)

  const handleSortByDate = () => {}
  const handleSortByDistance = () => {}

    return (
      <div className="activity-history-page-container">
        <FadeInAnimation>
          <div className="table-container">
            {props.activity.tableData.activityHistory.length && !loadingState ? (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="left" className="date-column-header">
                        <div className="date-header">
                          <span>Date</span>
                          {sortByDate ? (
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
                          {sortByDistance ? (
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
                    {props.activity.tableData.activityHistory.map(row => (
                      <TableRow key={row.id}>
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
                        <TableCell align="right" component="th" scope="row">
                          <div>
                            <DropdownMenu rowId={row.id} />
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

const mapState = state => {
  return {
    user: state.user,
    activity: {
      currentUser: state.activity.currentUser,
      allUsers: state.activity.allUsers
    },
    tableData: {
      activityHistory: state.activity.tableData.activityHistory,
    },
    chartData: {
      leaderboard: state.activity.chartData.leaderboard,
      monthlyPerformance: state.activity.chartData.monthlyPerformance,
    },
    loaders: {
      activityDeleted: state.activity.loaders.activityDeleted
    }
  };
};

const mapDispatch = dispatch => {
  return {
    async loadInitialData(userId) {
      await dispatch(getActivityForCurrentUser(userId));
    },
    async deleteUserActivity(id, userId) {
      await dispatch(deleteActivity(id, userId));
    },
    async loadActivityHistoryTableData(data) {
      await dispatch(getActivityHistoryTableData(data));
    },
  };
};

export default connect(mapState, mapDispatch)(ActivityHistoryTable);
