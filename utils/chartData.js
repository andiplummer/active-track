const {
  getCurrentYear,
  getCurrentMonth,
  convertDateToTimestamp,
  getNumOfDaysInMonth,
  getTodaysDate,
  formatDate,
} = require('../utils/dateTimeUtils');
const { formatDistance, getMtdMiles } = require('../utils/distanceUtils');

const getTotalDistanceInMonthOfInputDate = (userActivityData, date) => {
  let totalDistance = 0;
  const currentMonth = date
    ? formatDate(date, 'MM')
    : getCurrentMonth()

  userActivityData.forEach(activity => {
    const activityMonth = formatDate(activity.date, 'MM');

    if (activityMonth === currentMonth) {
      totalDistance += activity.distance;
    }
  });

  return totalDistance;
};

const getTargetActivityData = () => {
  const numOfDaysInMonth = getNumOfDaysInMonth();
  const todaysDate = getTodaysDate('YYYY-MM-DD');
  const currentYear = getCurrentYear();
  const currentMonth = formatDate(getTodaysDate(), 'MM');
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

const formatMonthlyProgressChartData = activityData => {
  const targetData = getTargetActivityData();

  const formattedData = {};
  const formattedTargetData = {};

  const todaysDate = getTodaysDate('YYYY-MM-DD');
  const currentMonth = formatDate(getTodaysDate(), 'MM');
  const firstOfMonthDate = `${getCurrentYear()}-${currentMonth}-01`;

  let totalDistance = 0;

  activityData.forEach((activityEntry, index) => {
    const entryDate = activityEntry.date;
    const entryDistance = activityEntry.distance;

    // check if first entry date === first of month and add 0 value if not
    if (index === 0) {
      if (entryDate !== firstOfMonthDate) {
        formattedData[firstOfMonthDate] = 0;
        formattedData[entryDate] = entryDistance

        formattedTargetData[firstOfMonthDate] = targetData[firstOfMonthDate];
        formattedTargetData[entryDate] = targetData[entryDate]
      } else {
        formattedData[firstOfMonthDate] = entryDistance;
        formattedTargetData[firstOfMonthDate] = targetData[firstOfMonthDate];
      }

      totalDistance += entryDistance;
      totalDistance = formatDistance(totalDistance)
      // check if last entry data === today's date. If not, add entry for today's date equal to the last data point's value
    } else if (
      activityData.length > 1 &&
      index === activityData.length - 1 &&
      entryDate !== todaysDate
    ) {
      totalDistance += entryDistance;
      totalDistance = formatDistance(totalDistance)
      formattedData[entryDate] = totalDistance;
      formattedData[todaysDate] = totalDistance;

      formattedTargetData[entryDate] = targetData[entryDate];
      formattedTargetData[todaysDate] = targetData[todaysDate];
    } else {
      totalDistance += entryDistance;
      totalDistance = formatDistance(totalDistance)

      formattedData[entryDate] = totalDistance;
      formattedTargetData[entryDate] = targetData[entryDate];
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

const sortAllUserDataByDate = userData => {
  return userData.sort(
    (a, b) => convertDateToTimestamp(a.date) - convertDateToTimestamp(b.date)
  );
};

module.exports = {
  getTargetActivityData,
  sortAllUserDataByDate,
  getTotalDistanceInMonthOfInputDate,
  formatMonthlyProgressChartData
};
