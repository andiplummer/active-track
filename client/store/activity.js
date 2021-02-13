import axios from 'axios';
import {
  sortAllUserDataByDate,
  getTotalDistanceInMonthOfInputDate,
  formatMonthlyProgressChartData,
} from '../../utils/chartData';
import {
  getCurrentMonth,
  formatDate,
  getTodaysDate,
  convertDateToTimestamp
} from '../../utils/dateTimeUtils'
import actions, {
  clearedState,
  gotActivityForAllUsers,
  addedActivityData,
  deletedActivity,
  deletedSuccessfully,
  gotChallengeLeaderboardData,
  gotActivityForCurrentUser,
  gotActivityHistoryTableData,
  gotProgressChartData,
} from './actions';

export const clearState = () => async dispatch => {
  dispatch(clearedState());
};

export const addActivityData = (userId, body) => async dispatch => {
  try {
    const { data } = await axios.post(`/api/activity/add/${userId}`, body);
    dispatch(addedActivityData(data));
    const res = await axios.get(`/api/activity/${userId}`);
    dispatch(getActivityForCurrentUser(userId));
    dispatch(getActivityForAllUsers());
    dispatch(getProgressChartData(userId))
  } catch (error) {
    console.log(error);
  }
};

export const getActivityForCurrentUser = userId => async dispatch => {
  try {
    const { data } = await axios.get(`/api/activity/${userId}`);
    dispatch(gotActivityForCurrentUser(data));
    dispatch(getActivityHistoryTableData(data));
    dispatch(getProgressChartData(userId))
  } catch (error) {
    console.log(error);
  }
};

export const getActivityForAllUsers = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/activity/all/grouped-by-user');
    dispatch(gotActivityForAllUsers(data));
    dispatch(getChallengeLeaderboardData(data));
  } catch (error) {
    console.log(error);
  }
};

export const deleteActivity = (id, userId) => async dispatch => {
  try {
    await axios.delete(`/api/activity/${id}`);
    dispatch(getActivityForCurrentUser(userId));
    dispatch(getActivityForAllUsers());
  } catch (error) {
    console.log(error);
  }
};

export const getActivityHistoryTableData = userData => async dispatch => {
  try {
    const sortedData = sortAllUserDataByDate(userData).reverse();
    const data = sortedData.map(dataPoint => {
      return {
        id: dataPoint.id,
        date: dataPoint.date,
        time: dataPoint.time,
        distance: dataPoint.distance,
        action: 'action',
      };
    });

    dispatch(gotActivityHistoryTableData(data));
  } catch (error) {
    console.log(error);
  }
};

export const getChallengeLeaderboardData = allUserActivityData => async dispatch => {
  try {
    const leaderboardData = [];

    allUserActivityData.forEach(user => {
      const currentUserActivityArray = user.activityEntries;
      const userName = user.firstName;
      if (currentUserActivityArray.length) {
        const totalDistanceThisMonth = Number(
          getTotalDistanceInMonthOfInputDate(currentUserActivityArray).toFixed(
            2
          )
        );

        leaderboardData.push({
          name: userName,
          distance: totalDistanceThisMonth,
        });
      }
    });

    const sortedBarChartData = leaderboardData.sort(
      (a, b) => b.distance - a.distance
    );
    const formattedBarChartData = [];
    sortedBarChartData.forEach(dataPoint =>
      formattedBarChartData.push([dataPoint.name, dataPoint.distance])
    );
    dispatch(gotChallengeLeaderboardData(formattedBarChartData));
  } catch (error) {
    console.log(error);
  }
};

export const getProgressChartData = userId => async dispatch => {
  try {
    console.log('current month', formatDate(getTodaysDate(), 'MM'))
    const { data } = await axios.get(`/api/activity/${userId}`);

    const currentMonthActivityData = data
    .filter(
      activityEntry => activityEntry.date.split('-')[1] === formatDate(getTodaysDate(), 'MM')
    )
    .sort(
      (a, b) =>
        convertDateToTimestamp(a.date) - convertDateToTimestamp(b.date)
    );

    console.log('monthly data', currentMonthActivityData);
    const formattedData = formatMonthlyProgressChartData(currentMonthActivityData)
    dispatch(gotProgressChartData(formattedData));
  } catch (error) {
    console.log(error);
  }
};

// REDUCER
const initialState = {
  currentUser: [],
  allUsers: {},
  tableData: {
    activityHistory: [],
  },
  chartData: {
    leaderboard: [],
    monthlyPerformance: [],
  },
  loaders: {
    activityDeleted: false,
  },
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actions.CLEARED_STATE:
      return initialState;
    case actions.GOT_ACTIVITY_FOR_CURRENT_USER:
      return { ...state, currentUser: action.data };
    case actions.GOT_ACTIVITY_FOR_ALL_USERS:
      return { ...state, allUsers: action.data };
    case actions.ADDED_ACTIVITY:
      return {
        ...state,
        currentUser: [...state.currentUser, action.data],
      };
    case actions.DELETED_ACTIVITY:
      return { ...state, currentUser: action.data };
    case actions.DELETED_SUCCESSFULLY:
      return {
        ...state,
        loaders: { ...state, activityDeleted: !state.loaders.activityDeleted },
      };
    case actions.GOT_DATA_FOR_ACTIVITY_HISTORY_TABLE:
      return {
        ...state,
        tableData: { ...state.tableData, activityHistory: action.data },
      };
    case actions.GOT_CHALLENGE_LEADERBOARD_DATA:
      return {
        ...state,
        chartData: { ...state.chartData, leaderboard: action.data },
      };
    case actions.GOT_PROGRESS_CHART_DATA:
      return {
        ...state,
        chartData: { ...state.chartData, monthlyPerformance: action.data },
      };
    default:
      return state;
  }
}
