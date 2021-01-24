import axios from 'axios'

const GOT_ALL_USERS = 'GET_ALL_USERS'
export const GOT_ALL_USER_DATA = 'GOT_ALL_USER_DATA'
export const CLEARED_WORKOUT_STATE = 'CLEARED_WORKOUT_STATE'
export const GOT_USER_WORKOUTS = 'GOT_USER_WORKOUTS'
export const ADDED_USER_ACTIVITY = 'ADDED_USER_ACTIVITY'


export const clearedWorkoutState = () => ({
  type: CLEARED_WORKOUT_STATE
})

export const gotUserWorkouts = workouts => ({
  type: GOT_USER_WORKOUTS,
  workouts
})

export const gotAllUsers = users => ({
  type: GOT_ALL_USERS,
  users
})

export const gotAllUserData = data => ({
  type: GOT_ALL_USER_DATA,
  data
})

export const addedUserActivity = activity => ({
  type: ADDED_USER_ACTIVITY,
  activity
})

export const clearWorkoutState = () => async dispatch => {
  dispatch(clearedWorkoutState())
}

export const getUserWorkouts = userId => async dispatch => {
  const {data} = await axios.get(`/api/activity/${userId}`)
  dispatch(gotUserWorkouts(data))
}

export const getAllUsers = () => async dispatch => {
  const {data} = await axios.get('/api/users')
  dispatch(gotAllUsers(data))
}

export const getAllUserData = () => async dispatch => {
  const {data} = await axios.get('/api/users')
  const result = {}
  await data.forEach(async user => {
    const res = await axios.get(`/api/activity/${user.id}`)
    result[user.id] = res.data
  })

  dispatch(gotAllUserData(result))
}

export const addUserActivity = (userId, body) => async dispatch => {
  console.log('user id and body', userId, body)
  const {data} = await axios.post(`/api/activity/add/${userId}`, body)
  dispatch(addedUserActivity(data))
}

// REDUCER
const initialState = {
  userWorkouts: [],
  allUsers: [],
  allUserData: {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case CLEARED_WORKOUT_STATE:
      return initialState
    case GOT_USER_WORKOUTS:
      return {...state, userWorkouts: action.workouts}
    case GOT_ALL_USERS:
      return {...state, allUsers: action.users}
    case GOT_ALL_USER_DATA:
      return {...state, allUserData: action.data}
    case ADDED_USER_ACTIVITY:
      return {...state, userWorkouts: [...state.userWorkouts, action.activity]}
    default:
      return state
  }
}
