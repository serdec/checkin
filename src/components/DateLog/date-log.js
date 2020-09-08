import React, { useState } from 'react';
import moment from 'moment';
import { DatePicker, message } from 'antd';
import PropTypes from 'prop-types';

import styles from './date-log.module.css';

const DateLog = ({ getCheckin }) => {
  const [checkin, setVisibleCheckin] = useState({});
  const onDateChange = (date) => {
    message.info(`${moment(date).toDate().getFullYear()}`);
    setVisibleCheckin(getCheckin(moment(date).toDate().getFullYear()));
  };
  return (
    <div className={styles.dateLog}>
      <DatePicker onChange={(date, dateString) => onDateChange(dateString)} />
      {JSON.stringify(checkin)}
    </div>
  );
};

DateLog.propTypes = {
  getCheckin: PropTypes.func,
};
export default DateLog;
