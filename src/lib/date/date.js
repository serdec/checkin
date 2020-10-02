import moment from 'moment';

const DATE_FORMAT = 'L';

export const getCurrentDateString = () => {
  return moment().format(DATE_FORMAT);
};

export const getDateString = (date = undefined) => {
  if (date === undefined) return undefined;
  return moment(date).format(DATE_FORMAT);
};

export const getDateMoment = (date = undefined) => {
  if (date === undefined) return undefined;
  return moment(date);
};
