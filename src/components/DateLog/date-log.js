import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getDateString } from '../../lib/date/date';
import { DatePicker } from 'antd';
import PropTypes from 'prop-types';
import { getCheckinByDay } from '../../reducers/checkins/checkinsCollection/checkins-collection';
import styles from './date-log.module.css';
import TeamDayCheckins from './team-day-checkins';

const mapStateToProps = (state) => ({
  getCheckin: (date) => {
    console.log(JSON.stringify(state));
    //TODO remove state shape
    return getCheckinByDay({
      state: state.checkins,
      date,
      teamId: state.activeTeam,
    });
  },
});

const DateLog = ({ getCheckin }) => {
  const [checkins, setVisibleCheckin] = useState([]);
  const [dateValue, setDateValue] = useState();

  useEffect(() => {
    setVisibleCheckin(getCheckin(getDateString(dateValue)));
  }, [getCheckin, dateValue]);

  const onDateChange = (date) => {
    setDateValue(date);
    setVisibleCheckin(getCheckin(getDateString(date)));
  };
  return (
    <div className={styles.dateLog}>
      <DatePicker value={dateValue} onChange={(date) => onDateChange(date)} />
      <TeamDayCheckins checkins={checkins} />
    </div>
  );
};

DateLog.propTypes = {
  getCheckin: PropTypes.func,
};
export default connect(mapStateToProps)(DateLog);
