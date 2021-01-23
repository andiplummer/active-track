const {
  getCurrentYear,
  getCurrentMonth,
  convertDateToTimestamp,
  getNumOfDaysInMonth,
  getTodaysDate
} = require('../utils/dateTimeUtils');
const { formatDistance, getMtdMiles } = require('../utils/distanceUtils');

const getTargetActivityData = () => {
  const numOfDaysInMonth = getNumOfDaysInMonth()
  const todaysDate = getTodaysDate('YYYY-MM-DD')
  const currentYear = getCurrentYear()
  const currentMonth = getCurrentMonth()
  const milesPerDay = formatDistance(100 / numOfDaysInMonth)

  const data = {}

  let currentDay = 1
  let runningActivityTotal = milesPerDay;

  while (currentDay <= Number(todaysDate.split('-')[2])) {
    let currentDayString = currentDay < 10 ? `0${currentDay}` : String(currentDay)
    data[`${currentYear}-${currentMonth}-${currentDayString}`] = runningActivityTotal
    runningActivityTotal += milesPerDay
    runningActivityTotal = formatDistance(runningActivityTotal)
    currentDay += 1
  }

  return data
}

const formatCurrentMonthSingleParticipantDataForLineChart = singleUserWorkoutData => {
  const targetData = getTargetActivityData()

  const formattedData = {};
  const formattedTargetData = {};

  const todaysDate = getTodaysDate('YYYY-MM-DD')
  const currentMonth = getCurrentMonth();

  let previousTotal = 0;
  const dataForCurrentMonth = singleUserWorkoutData
    .filter(
      workoutData =>
        workoutData.dateFrom.split('-')[1] === currentMonth &&
        workoutData.dateTo.split('-')[1] === currentMonth
    )
    .sort(
      (a, b) =>
        convertDateToTimestamp(a.dateFrom) - convertDateToTimestamp(b.dateFrom)
    );

  dataForCurrentMonth.forEach((dataPoint, index) => {
    if (index === 0 && dataPoint.dateTo.split('-')[2] !== '01') {
      formattedData[`${getCurrentYear()}-${getCurrentMonth()}-01`] = 0;
      previousTotal += dataPoint.distance;
      previousTotal = formatDistance(previousTotal);
      formattedTargetData[`${getCurrentYear()}-${getCurrentMonth()}-01`] = targetData[`${getCurrentYear()}-${getCurrentMonth()}-01`]
    } else if (index === dataForCurrentMonth.length - 1 && dataPoint.dateTo !== todaysDate) {
      previousTotal += dataPoint.distance;
      previousTotal = formatDistance(previousTotal);
      formattedData[dataPoint.dateFrom] = previousTotal;
      formattedTargetData[dataPoint.dateFrom] = targetData[dataPoint.dateFrom]
      formattedData[todaysDate] = previousTotal
      formattedTargetData[todaysDate] = targetData[todaysDate]
    } else {
      previousTotal += dataPoint.distance;
      previousTotal = formatDistance(previousTotal);
      formattedData[dataPoint.dateFrom] = previousTotal;
      formattedTargetData[dataPoint.dateFrom] = targetData[dataPoint.dateFrom]
    }
  });

  return [
    {
      name: 'My activity',
      data: formattedData
    },
    {
      name: 'Target activity to reach 100 miles',
      data: formattedTargetData,
    }
  ]
};

const formatAllUserDataForLineChart = (allUsers, allUserData) => {
  const lineChartData = [];
  const userIdsInAllUserData = Object.keys(allUserData).filter(id => id === 3);

  userIdsInAllUserData.forEach(userId => {
    const userDetails = allUsers.find(user => user.id === Number(userId));

    const userData = allUserData[userId];
    lineChartData.push({
      name: userDetails.firstName,
      data: formatCurrentMonthSingleParticipantDataForLineChart(userData),
    });
  });

  return lineChartData;
};

const formatUserDataForBarChart = (allUsers, allUserData) => {
  const barChartData = [];
  const userIdsInAllUserData = Object.keys(allUserData);

  userIdsInAllUserData.forEach(userId => {
    const userDetails = allUsers.find(user => user.id === Number(userId));
    console.log('user userDetails', userDetails);

    const userData = allUserData[userId];
    barChartData.push({
      name: userDetails.firstName,
      miles: getMtdMiles(userData),
    });
  });

  const sortedBarChartData = barChartData.sort((a, b) => b.miles - a.miles);

  const result = [];
  sortedBarChartData.forEach(dataPoint =>
    result.push([dataPoint.name, dataPoint.miles])
  );

  return result;
};

const sortAllUserDataByDate = (userData) => {
  return userData.sort(
    (a, b) =>
      convertDateToTimestamp(a.dateFrom) - convertDateToTimestamp(b.dateFrom)
  );
}

module.exports = {
  formatCurrentMonthSingleParticipantDataForLineChart,
  formatAllUserDataForLineChart,
  formatUserDataForBarChart,
  getTargetActivityData,
  sortAllUserDataByDate
};
