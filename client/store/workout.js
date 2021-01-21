import axios from 'axios'
import history from '../history'

export const GOT_USER_WORKOUTS = 'GOT_USER_WORKOUTS'

export const gotUserWorkouts = workouts => ({
  type: GOT_USER_WORKOUTS,
  workouts
})

export const getUserWorkouts = userId => async dispatch => {
  const {data} = await axios.get(`/api/workouts/${userId}`)
  dispatch(gotUserWorkouts(data))
}

// REDUCER
const initialState = {
  userWorkouts: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_USER_WORKOUTS:
      return {...state, userWorkouts: action.workouts}
    default:
      return state
  }
}
