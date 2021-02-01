const {
  getCurrentYear,
  getCurrentMonth,
  convertDateToTimestamp,
  getNumOfDaysInMonth,
  getTodaysDate,
} = require('../utils/dateTimeUtils');
const { formatDistance, getMtdMiles } = require('../utils/distanceUtils');

const getTargetActivityData = () => {
  const numOfDaysInMonth = getNumOfDaysInMonth();
  const todaysDate = getTodaysDate('YYYY-MM-DD');
  const currentYear = getCurrentYear();
  const currentMonth = getCurrentMonth();
  const milesPerDay = formatDistance(100 / numOfDaysInMonth);

  const data = {};

  let currentDay = 1;
  let runningActivityTotal = milesPerDay;

  while (currentDay <= Number(todaysDate.split('-')[2])) {
    let currentDayString =
      currentDay < 10 ? `0${currentDay}` : String(currentDay);
    data[
      `${currentYear}-${currentMonth}-${currentDayString}`
    ] = runningActivityTotal;
    runningActivityTotal += milesPerDay;
    runningActivityTotal = formatDistance(runningActivityTotal);
    currentDay += 1;
  }

  return data;
};

const formatCurrentMonthSingleParticipantDataForLineChart = singleUserWorkoutData => {
  const targetData = getTargetActivityData();

  const formattedData = {};
  const formattedTargetData = {};

  const todaysDate = getTodaysDate('YYYY-MM-DD');
  const currentMonth = getCurrentMonth();
  const firstOfMonthDate = `${getCurrentYear()}-${currentMonth}-01`

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

  let previousTotal = 0;

  dataForCurrentMonth.forEach((dataPoint, index) => {
    const currentDateFrom = dataPoint.dateFrom
    const currentDateTo = dataPoint.dateTo
    // if there is only one entry
    if (dataForCurrentMonth.length === 1) {
      if (currentDateFrom !== firstOfMonthDate) {
        formattedData[firstOfMonthDate] = 0;
        formattedData[currentDateFrom] = 0;

        formattedTargetData[firstOfMonthDate] = targetData[firstOfMonthDate]
        formattedTargetData[currentDateFrom] = targetData[currentDateFrom]
      }
      
      if (currentDateFrom === firstOfMonthDate && currentDateTo === firstOfMonthDate) {
        formattedData[firstOfMonthDate] = dataPoint.distance
        previousTotal += dataPoint.distance
        previousTotal = formatDistance(previousTotal);

        formattedTargetData[firstOfMonthDate] = targetData[firstOfMonthDate]
      } else if (currentDateFrom === firstOfMonthDate && currentDateTo === todaysDate) {
        formattedData[firstOfMonthDate] = 0
        formattedData[todaysDate] = dataPoint.distance
        previousTotal += dataPoint.distance
        previousTotal = formatDistance(previousTotal);

        formattedTargetData[firstOfMonthDate] = targetData[firstOfMonthDate]
        formattedTargetData[todaysDate] = targetData[todaysDate]
      } else if (currentDateFrom === firstOfMonthDate && currentDateTo !== todaysDate) {
        formattedData[firstOfMonthDate] = 0
        formattedData[currentDateTo] = dataPoint.distance
        formattedData[todaysDate] = dataPoint.distance
        previousTotal += dataPoint.distance
        previousTotal = formatDistance(previousTotal);

        formattedTargetData[firstOfMonthDate] = targetData[firstOfMonthDate]
        formattedTargetData[currentDateTo] = targetData[currentDateTo]
        formattedTargetData[todaysDate] = targetData[todaysDate]
      }
      
      if (currentDateTo !== todaysDate) {
        formattedData[currentDateTo] = previousTotal
        formattedData[todaysDate] = previousTotal

        formattedTargetData[currentDateTo] = targetData[currentDateTo]
        formattedTargetData[todaysDate] = targetData[todaysDate]
      }

      if (currentDateTo === todaysDate) {
        formattedData[todaysDate] = previousTotal
        formattedTargetData[todaysDate] = targetData[todaysDate]
      }
    } else {
      // if there is more than one entry
      if (index === 0 && dataPoint.dateFrom !== firstOfMonthDate) {
        formattedData[firstOfMonthDate] = 0
        formattedTargetData[firstOfMonthDate] = targetData[firstOfMonthDate]
      }
      if (
        index === dataForCurrentMonth.length - 1 &&
        dataPoint.dateTo !== todaysDate
      ) {  
        formattedData[currentDateFrom] = previousTotal;
        formattedTargetData[currentDateFrom] = targetData[currentDateFrom];
        previousTotal += dataPoint.distance;
        previousTotal = formatDistance(previousTotal);
        formattedData[currentDateTo] = previousTotal
        formattedTargetData[currentDateTo] = targetData[currentDateTo]
        formattedData[todaysDate] = previousTotal;
        formattedTargetData[todaysDate] = targetData[todaysDate];
      } else if (currentDateFrom !== currentDateTo) {
        formattedData[currentDateFrom] = previousTotal
        previousTotal += dataPoint.distance
        previousTotal = formatDistance(previousTotal);
        formattedData[currentDateTo] = previousTotal

        formattedTargetData[currentDateFrom] = targetData[currentDateFrom]
        formattedTargetData[currentDateTo] = targetData[currentDateTo]
      } else if (currentDateFrom === currentDateTo) {
        formattedData[dataPoint.dateFrom] = previousTotal;
        previousTotal += dataPoint.distance;
        previousTotal = formatDistance(previousTotal);
        formattedData[currentDateTo] = previousTotal
        formattedTargetData[dataPoint.dateFrom] = targetData[dataPoint.dateFrom];
      }
    }
  });

  return [
    {
      name: 'My activity',
      data: formattedData,
    },
    {
      name: 'Target activity to reach 100 miles',
      data: formattedTargetData,
    },
  ];
};

const formatAllUserDataForLineChart = (allUsers, allUserData) => {
  const lineChartData = [];
  const userIdsInAllUserData = Object.keys(allUserData)

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

const sortAllUserDataByDate = userData => {
  return userData.sort(
    (a, b) =>
      convertDateToTimestamp(a.dateFrom) - convertDateToTimestamp(b.dateFrom)
  );
};

module.exports = {
  formatCurrentMonthSingleParticipantDataForLineChart,
  formatAllUserDataForLineChart,
  formatUserDataForBarChart,
  getTargetActivityData,
  sortAllUserDataByDate,
};
