import { connect } from 'react-redux';
import React, { useState } from 'react';
import { DropdownMenu } from '../index';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {
  getActivityForCurrentUser,
  deleteActivity,
  getActivityHistoryTableData,
} from '../../store';
import { formatDate } from '../../../utils/dateTimeUtils';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { useDownloadMenuStyles } from '@mui-treasury/styles/menu/download';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';

const ActivityHistoryTable = props => {
  const [sortByDate, setSortByDate] = useState(false);
  const [sortByDistance, setSortByDistance] = useState(false);
  const [loadingState, setLoadingState] = useState(false);

  const handleSortByDate = () => {};
  const handleSortByDistance = () => {};


  return (
    <div className="activity-history-page-container">
      <div className="table-container">
        {props.tableData.activityHistory.length ? (
          <TableContainer component={Paper} style={{width: '100%', margin: '0px'}}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left" className="date-column-header" style={{paddingLeft: '5px'}}>
                    <div className="date-header">
                      <span>Date</span>
                      {sortByDate ? <ExpandLessIcon className="sort-icon" /> : <ExpandMoreIcon className="sort-icon" />}
                    </div>
                  </TableCell>
                  <TableCell align="left" className="distance-column-header" style={{paddingLeft: '5px'}}>
                    <div className="distance-header">
                      <span>Distance</span>
                      {sortByDistance ? <ExpandLessIcon className="sort-icon" /> : <ExpandMoreIcon className="sort-icon" />}
                    </div>
                  </TableCell>
                  <TableCell align="right" className="action-column-header" style={{paddingRight: '5px'}}>
                    {' '}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.tableData.activityHistory.map(row => (
                  <TableRow key={row.id}>
                    <TableCell align="left" className="date-column">
                      {
                        <div className="column-detail-container">
                          <span className="column-value">
                            {formatDate(row.date, 'MM/DD/YYYY')}
                          </span>
                          {/* <span className="column-detail">{row.time}</span> */}
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
          <h1>No Activity Data</h1>
        )}
      </div>
    </div>
  );
};

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
    loaders: {
      activityDeleted: state.activity.loaders.activityDeleted,
    },
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
// export default ActivityHistoryTable
