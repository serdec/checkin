import React from 'react';
import moment from 'moment';
import { number, any } from 'prop-types';
import styles from '../history.module.css';

const CalendarCell = ({ colorValue = 0, date = moment() } = {}) => {
  const colorClass = `history__calendarCell_${colorValue}`;

  return (
    <div className={`${styles.history__calendarCell} ${styles[colorClass]}`}>
      {' '}
      {date.date()}
    </div>
  );
};
CalendarCell.propTypes = {
  colorValue: number,
  date: any,
};
export default CalendarCell;
