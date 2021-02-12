const GOT_ACTIVITY_FOR_CURRENT_USER = 'GOT_ACTIVITY_FOR_CURRENT_USER';
const ADDED_ACTIVITY = 'ADDED_ACTIVITY';
const DELETED_ACTIVITY = 'DELETED_ACTIVITY';
const GOT_DATA_FOR_ACTIVITY_HISTORY_TABLE = 'GOT_DATA_FOR_ACTIVITY_HISTORY_TABLE';
const DELETED_SUCCESSFULLY = 'DELETED_SUCCESSFULLY'
const GOT_ACTIVITY_FOR_ALL_USERS = 'GOT_ACTIVITY_FOR_ALL_USERS'
const CLEARED_STATE = 'CLEARED_STATE'
const GOT_CHALLENGE_LEADERBOARD_DATA = 'GOT_CHALLENGE_LEADERBOARD_DATA'

export const clearedState = () => ({
  type: CLEARED_STATE,
});

export const gotActivityForCurrentUser = data => ({
  type: GOT_ACTIVITY_FOR_CURRENT_USER,
  data,
});

export const gotActivityForAllUsers = data => ({
  type: GOT_ACTIVITY_FOR_ALL_USERS,
  data,
})

export const addedActivityData = data => ({
  type: ADDED_ACTIVITY,
  data,
});

export const deletedActivity = data => ({
  type: DELETED_ACTIVITY,
  data,
});

export const gotActivityHistoryTableData = (data) => ({
  type: GOT_DATA_FOR_ACTIVITY_HISTORY_TABLE,
  data,
});

export const deletedSuccessfully = () => ({
  type: DELETED_SUCCESSFULLY
})

export const gotChallengeLeaderboardData = data => ({
  type: GOT_CHALLENGE_LEADERBOARD_DATA,
  data
})

export default {
  GOT_ACTIVITY_FOR_CURRENT_USER,
  GOT_ACTIVITY_FOR_ALL_USERS,
  ADDED_ACTIVITY,
  DELETED_ACTIVITY,
  DELETED_SUCCESSFULLY,
  GOT_DATA_FOR_ACTIVITY_HISTORY_TABLE,
  GOT_CHALLENGE_LEADERBOARD_DATA
}