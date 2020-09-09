import React, { useState } from 'react';
import { connect } from 'react-redux';
import { getDateString } from '../../lib/date/date';
import { DatePicker, message } from 'antd';
import PropTypes from 'prop-types';
import { getCheckinByDay } from '../../reducers/checkins/checkinsCollection/checkins-collection';
import styles from './date-log.module.css';
import TeamDayCheckins from './team-day-checkins';

const mapStateToProps = (state) => ({
  getCheckin: (date) => {
    console.log(state);
    //TODO remove state shape
    return getCheckinByDay(state.checkins, date);
  },
});

const DateLog = ({ getCheckin }) => {
  const [checkins, setVisibleCheckin] = useState([]);
  const onDateChange = (date) => {
    setVisibleCheckin(getCheckin(getDateString(date)));
  };
  return (
    <div className={styles.dateLog}>
      <DatePicker onChange={(date) => onDateChange(date)} />
      <TeamDayCheckins checkins={checkins} />
    </div>
  );
};

DateLog.propTypes = {
  getCheckin: PropTypes.func,
};
export default connect(mapStateToProps)(DateLog);
