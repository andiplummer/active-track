import axios from 'axios';
import { sortAllUserDataByDate, getTotalDistanceInMonthOfInputDate } from '../../utils/chartData';
import actions, {
  clearedState,
  gotActivityForAllUsers,
  addedActivityData,
  deletedActivity,
  deletedSuccessfully,
  gotChallengeLeaderboardData,
  gotActivityForCurrentUser,
  gotActivityHistoryTableData,
} from './actions'

export const clearState = () => async dispatch => {
  dispatch(clearedState())
};

export const addActivityData = (userId, body) => async dispatch => {
  try {
    const { data } = await axios.post(`/api/activity/add/${userId}`, body);
    dispatch(addedActivityData(data));
  } catch (error) {
    console.log(error);
  }
};

export const getActivityForCurrentUser = userId => async dispatch => {
  try {
    const { data } = await axios.get(`/api/activity/${userId}`);
    dispatch(gotActivityForCurrentUser(data));
  } catch (error) {
    console.log(error);
  }
};

export const getActivityForAllUsers = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/activity/all/grouped-by-user');
    dispatch(gotActivityForAllUsers(data))
  } catch (error) {
    console.log(error);
  }
}

export const deleteActivity = (id, userId) => async dispatch => {
  try {
    await axios.delete(`/api/activity/${id}`);
    const { data } = await axios.get(`/api/activity/${userId}`);
    dispatch(deletedActivity(data));
    dispatch(deletedSuccessfully())
  } catch (error) {
    console.log(error);
  }
};

export const getActivityHistoryTableData = userData => async dispatch => {
  try {
    console.log('input', userData)
    const sortedData = sortAllUserDataByDate(userData).reverse();
    const data = sortedData.map(dataPoint => {
      return {
        id: dataPoint.id,
        date: dataPoint.date,
        time: dataPoint.time,
        distance: dataPoint.distance,
        action: 'action',
      }
    })
    console.log('data', data)
    dispatch(gotActivityHistoryTableData(data))
  } catch (error) {
    console.log(error);
  }
}

export const getChallengeLeaderboardData = (allUserActivityData) => async dispatch => {
  try {
    const leaderboardData = []
    const userIds = Object.keys(allUserActivityData)
  
    if (userIds.length) {
      userIds.forEach(id => {
        const currentUserActivityArray = allUserActivityData[id].activities;
        const userName = allUserActivityData[id].firstName;
        if (currentUserActivityArray.length) {
          const totalDistanceThisMonth = getTotalDistanceInMonthOfInputDate(currentUserActivityArray)
          
          leaderboardData.push({
            name: userName,
            distance: totalDistanceThisMonth
          })
        }
      })
    }

    const sortedBarChartData = leaderboardData.sort((a, b) => a.distance - b.distance )
    const formattedBarChartData = [];
    sortedBarChartData.forEach(dataPoint =>
      formattedBarChartData.push([dataPoint.name, dataPoint.distance])
    );
    dispatch(gotChallengeLeaderboardData(formattedBarChartData))
  } catch (error) {
    console.log(error);
  }
}

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
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actions.CLEARED_STATE:
      return initialState;
    case actions.GOT_ACTIVITY_FOR_CURRENT_USER:
      return { ...state, currentUser: action.data };
    case actions.GOT_ACTIVITY_FOR_ALL_USERS:
      return { ...state, allUsers: action.data }
    case actions.ADDED_ACTIVITY:
      return {
        ...state,
        currentUser: [...state.currentUser, action.data],
      };
    case actions.DELETED_ACTIVITY:
      return { ...state, currentUser: action.data };
    case actions.DELETED_SUCCESSFULLY:
      return {...state, loaders: {...state, activityDeleted: !state.loaders.activityDeleted}}
    case actions.GOT_DATA_FOR_ACTIVITY_HISTORY_TABLE:
      return {...state, tableData: {...state.tableData, activityHistory: action.data}}
    case actions.GOT_CHALLENGE_LEADERBOARD_DATA:
      return {...state, chartData: {...state.chartData, leaderboard: action.data}}
      default:
      return state;
  }
}
