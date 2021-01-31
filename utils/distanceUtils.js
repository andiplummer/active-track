const {
  getCurrentYear,
  getCurrentMonth,
  getCurrentWeekOfYear,
  getWeekOfInputDate,
  convertDateToTimestamp,
} = require('../utils/dateTimeUtils');

const getYtdMiles = userWorkouts => {
  const currentYear = getCurrentYear();

  let ytdMiles = 0;
  userWorkouts.forEach(workout => {
    const workoutYear = Number(workout.dateFrom.split('-')[0]);

    if (workoutYear === currentYear) {
      ytdMiles += workout.distance;
    }
  });

  return formatDistance(ytdMiles);
};

const getMtdMiles = userWorkouts => {
  const currentMonth = getCurrentMonth();

  let mtdMiles = 0;
  userWorkouts.forEach(workout => {
    const workoutMonth = workout.dateFrom.split('-')[1];

    if (workoutMonth === currentMonth) {
      mtdMiles += workout.distance;
    }
  });

  return formatDistance(mtdMiles);
};

const getWtdMiles = userWorkouts => {
  const currentWeekOfYear = getCurrentWeekOfYear();

  let wtdMiles = 0;
  userWorkouts.forEach(workout => {
    const workoutWeek = getWeekOfInputDate(workout.dateFrom, 'YYYY-MM-DD');

    if (currentWeekOfYear === workoutWeek) {
      wtdMiles += workout.distance;
    }
  });

  return formatDistance(wtdMiles);
};

const getDailyMileRecord = userWorkouts => {
  const filterDailyEntries = userWorkouts.filter(
    workout => workout.dateFrom === workout.dateTo
  );
  return filterDailyEntries
    .map(workout => workout.distance)
    .sort((a, b) => b - a)[0];
};

const formatDistance = distance => Number(distance.toFixed(2))

module.exports = {
  getYtdMiles,
  getMtdMiles,
  getWtdMiles,
  getDailyMileRecord,
  formatDistance,
};