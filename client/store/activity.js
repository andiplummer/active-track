import axios from 'axios';
import { sortAllUserDataByDate } from '../../utils/chartData';

export const GOT_ALL_USERS = 'GET_ALL_USERS';
export const GOT_ALL_USER_DATA = 'GOT_ALL_USER_DATA';
export const CLEARED_WORKOUT_STATE = 'CLEARED_WORKOUT_STATE';
export const GOT_USER_WORKOUTS = 'GOT_USER_WORKOUTS';
export const ADDED_USER_ACTIVITY = 'ADDED_USER_ACTIVITY';
export const DELETED_ACTIVITY = 'DELETED_ACTIVITY';
export const UPDATED_ACTIVITY_HISTORY_TABLE = 'UPDATED_ACTIVITY_HISTORY_TABLE';
export const DELETED_SUCCESSFULLY = 'DELETED_SUCCESSFULLY'

export const clearedWorkoutState = () => ({
  type: CLEARED_WORKOUT_STATE,
});

export const gotUserWorkouts = workouts => ({
  type: GOT_USER_WORKOUTS,
  workouts,
});

export const gotAllUsers = users => ({
  type: GOT_ALL_USERS,
  users,
});

export const gotAllUserData = data => ({
  type: GOT_ALL_USER_DATA,
  data,
});

export const addedUserActivity = activity => ({
  type: ADDED_USER_ACTIVITY,
  activity,
});

export const deletedActivity = activity => ({
  type: DELETED_ACTIVITY,
  activity,
});

export const updatedActivityHistoryTable = (data) => ({
  type: UPDATED_ACTIVITY_HISTORY_TABLE,
  data,
});

export const deletedSuccessfully = () => ({
  type: DELETED_SUCCESSFULLY
})

export const clearWorkoutState = () => async dispatch => {
  try {
    dispatch(clearedWorkoutState());
  } catch (error) {
    console.log(error);
  }
  
};

export const getUserWorkouts = userId => async dispatch => {
  try {
    const { data } = await axios.get(`/api/activity/${userId}`);
    dispatch(gotUserWorkouts(data)); 
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/users');
    dispatch(gotAllUsers(data));
  } catch (error) {
    console.log(error);
  }
};

export const getAllUserData = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/users');
    const result = {};
    await data.forEach(async user => {
      const res = await axios.get(`/api/activity/${user.id}`);
      result[user.id] = res.data;
    });

    dispatch(gotAllUserData(result));
  } catch (error) {
    console.log(error);
  }
};

export const addUserActivity = (userId, body) => async dispatch => {
  try {
    const { data } = await axios.post(`/api/activity/add/${userId}`, body);
    dispatch(addedUserActivity(data));
  } catch (error) {
    console.log(error);
  }
};

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

export const updateActivityHistoryTable = userData => async dispatch => {
  try {
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
    dispatch(updatedActivityHistoryTable(data))
  } catch (error) {
    console.log(error);
  }
}

// REDUCER
const initialState = {
  deletedSuccessfully: false,
  userWorkouts: [],
  activityHistoryTableData: [],
  allUsers: [],
  allUserData: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CLEARED_WORKOUT_STATE:
      return initialState;
    case GOT_USER_WORKOUTS:
      return { ...state, userWorkouts: action.workouts };
    case GOT_ALL_USERS:
      return { ...state, allUsers: action.users };
    case GOT_ALL_USER_DATA:
      return { ...state, allUserData: action.data };
    case ADDED_USER_ACTIVITY:
      return {
        ...state,
        userWorkouts: [...state.userWorkouts, action.activity],
      };
    case DELETED_ACTIVITY:
      return { ...state, userWorkouts: action.activity };
    case DELETED_SUCCESSFULLY:
      return {...state, deletedSuccessfully: true}
    case UPDATED_ACTIVITY_HISTORY_TABLE:
      return {...state, activityHistoryTableData: action.data}
    default:
      return state;
  }
}
