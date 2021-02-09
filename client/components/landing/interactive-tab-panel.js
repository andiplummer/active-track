import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { formatDate, getTodaysDate } from '../../../utils/dateTimeUtils'
import {
  FadeInAnimation,
  ActivityHistoryTable
} from '../index';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'white',
    width: '100%',
  },
  indicator: {
    backgroundColor: '#f7c1a8',
  },
}));

function ActivityNavTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const currentMonth = formatDate(getTodaysDate(), 'MMMM')

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          classes={{
            indicator: classes.indicator,
          }}
          aria-label="simple tabs example"
          style={{ backgroundColor: '#303c6c' }}
        >
          <Tab label={`${currentMonth} Progress`} {...a11yProps(0)} />
          <Tab label="My Activity" {...a11yProps(1)} />
          <Tab label="Challenge History" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        {
          // Object.keys(props.activity.tableData.activityHistory).length ? <ActivityHistoryTable /> : null
        }
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
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
    }
  };
};

// const mapDispatch = dispatch => {
//   return {
//     async loadInitialData(userId) {
//       await dispatch(getActivityForCurrentUser(userId));
//       await dispatch(getActivityForAllUsers());
//     },
//     async loadCurrentUserActivityData(userId) {
//       await dispatch(getActivityForCurrentUser(userId));
//     },
//     async loadAllUserActivityData() {
//       await dispatch(getActivityForAllUsers());
//     },
//     async loadChallengeLeaderboardData(data) {
//       await dispatch(getChallengeLeaderboardData(data))
//     }
//   };
// };

export default connect(mapState)(ActivityNavTabs);
