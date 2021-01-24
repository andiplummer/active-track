import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { sortAllUserDataByDate } from '../../utils/chartData';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import { getUserWorkouts } from '../store';

// const useStyles = makeStyles({
//   table: {
//     minWidth: 350,
//   },
// });

// const classes = useStyles();

class ActivityHistoryTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rowData: [],
    };
  }

  async componentDidMount() {
    await this.props.loadInitialData(this.props.user.id);
    const rowData = await this.formatRowData(this.props.workouts);
    await this.setState({ rowData });
  }

  createData(editIcon, distance, dateFrom, dateTo) {
    return { editIcon, distance, dateFrom, dateTo };
  };

  formatRowData(userData) {
    const sortedData = sortAllUserDataByDate(userData);
    const rows = sortedData.map(dataPoint => {
      return this.createData(
        <Fab color="secondary" size="small" style={{backgroundColor: '#B4DFE5'}} aria-label="edit">
          <EditIcon />
        </Fab>,
        dataPoint.distance,
        dataPoint.dateFrom,
        dataPoint.dateTo
      );
    });

    console.log('rows hereeeee', rows)
    return rows;
  }

  render() {
    return (
      <div className="table-container">
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell> </TableCell>
                <TableCell align="center">Distance&nbsp;(miles)</TableCell>
                <TableCell align="center">Start Date</TableCell>
                <TableCell align="center">End Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.rowData.length
                ? this.state.rowData.map(row => (
                    <TableRow key={row.distance}>
                      <TableCell align="center" component="th" scope="row">
                        {row.editIcon}
                      </TableCell>
                      <TableCell align="left">{row.distance}</TableCell>
                      <TableCell align="left">{row.dateFrom}</TableCell>
                      <TableCell align="left">{row.dateTo}</TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </TableContainer>
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

export default connect(mapState, mapDispatch)(ActivityHistoryTable);
