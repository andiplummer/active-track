const moment = require('moment');

const getCurrentTime = () => moment().format('LT');

const getCurrentYear = () => moment().year();

const getCurrentMonth = () => {
  // moment returns index of month from 0 - 11
  const currentMonth = String(moment().month() + 1);

  if (currentMonth.length < 2) {
    return `0${currentMonth}`;
  }

  return currentMonth;
};

const getCurrentWeekOfYear = () => moment().week();

const getWeekOfInputDate = (date, inputFormat) =>
  moment(date, inputFormat).week();

const getTodaysDate = (outputFormat) => {
  return moment().format(outputFormat)
};

const formatDate = (
  date,
  outputFormat = 'YYYY-MM-DD'
) => {
  return moment(date).format(outputFormat);
};

const convertDateToTimestamp = date => moment(date, 'YYYY-MM-DD').unix();

const getNumOfDaysInMonth = () => {
  const currentMonth = getCurrentMonth();
  const currentYear = getCurrentYear();

  return moment(`${currentYear}-${currentMonth}`, 'YYYY-MM').daysInMonth();
};

const currentDateTimeForCalDatePicker = () => {
  return moment().format().slice(0,16)
}

module.exports = {
  getCurrentYear,
  getCurrentMonth,
  formatDate,
  getCurrentWeekOfYear,
  getWeekOfInputDate,
  convertDateToTimestamp,
  getNumOfDaysInMonth,
  getCurrentTime,
  getTodaysDate,
  currentDateTimeForCalDatePicker
};
