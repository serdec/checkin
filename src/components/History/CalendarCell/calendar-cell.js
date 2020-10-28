import React from 'react';
import moment from 'moment';
import { number, any } from 'prop-types';
import styles from '../history.module.css';

const CalendarCell = ({
  colorValue = 0,
  date = moment(),
  selectedDate = moment(),
} = {}) => {
  console.log(selectedDate.dayOfYear() === date.dayOfYear());
  const selected =
    selectedDate.dayOfYear() === date.dayOfYear()
      ? `history__calendarCell_selected`
      : '';
  const colorClass = `history__calendarCell_${colorValue}`;

  return (
    <div className={styles.history__cellContainer}>
      <div className={`${styles.history__calendarCell} ${styles[colorClass]}`}>
        {date.date()}
      </div>
      <div className={`${styles[selected]}`}></div>
    </div>
  );
};
CalendarCell.propTypes = {
  colorValue: number,
  date: any,
  selectedDate: any,
};
export default CalendarCell;
