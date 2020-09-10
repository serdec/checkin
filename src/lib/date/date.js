import moment from 'moment';

const DATE_FORMAT = 'L';

export const getCurrentDateString = () => {
  return moment().format(DATE_FORMAT);
};

export const getDateString = (date) => {
  return moment(date).format(DATE_FORMAT);
};
