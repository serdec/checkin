import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getDateString, getDateMoment } from '../../lib/date/date';
import { DatePicker } from 'antd';
import PropTypes from 'prop-types';
import { getCheckinsByDay } from '../Checkins/Collection/checkins-collection-reducer';
import styles from './date-log.module.css';
import TeamDayCheckins from '../Checkins/Collection/team-daily-summary';
import { getActiveTeam, getCheckins } from '../../store/root-reducer';
import { getCheckinsCollection } from '../Checkins/Collection/reducer';

const mapStateToProps = (state) => ({
  getCheckins: (date) => {
    return getCheckinsByDay({
      state: getCheckinsCollection(getCheckins(state)),
      date,
      teamId: getActiveTeam(state),
    });
  },
});

const DateLog = ({ getCheckins }) => {
  const [checkins, setVisibleCheckins] = useState([]);
  const [dateValue, setDateValue] = useState(getDateMoment(new Date()));

  useEffect(() => {
    setVisibleCheckins(getCheckins(getDateString(dateValue)));
  }, [getCheckins, dateValue]);

  const onDateChange = (date) => {
    setDateValue(date);
    setVisibleCheckins(getCheckins(getDateString(date)));
  };
  return (
    <div className={styles.dateLog}>
      <DatePicker
        className={styles.dateLog__datePicker}
        value={dateValue}
        onChange={(date) => onDateChange(date)}
      />
      <TeamDayCheckins checkins={checkins} />
    </div>
  );
};

DateLog.propTypes = {
  getCheckins: PropTypes.func,
};
export default connect(mapStateToProps)(DateLog);
