import axios from 'axios'

export const CLEARED_WORKOUT_STATE = 'CLEARED_WORKOUT_STATE'
export const GOT_USER_WORKOUTS = 'GOT_USER_WORKOUTS'
export const GOT_ALL_USER_DATA = 'GOT_ALL_USER_DATA'
const GOT_ALL_USERS = 'GET_ALL_USERS'


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
    default:
      return state
  }
}
