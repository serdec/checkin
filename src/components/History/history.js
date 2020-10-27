import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getDateString, getDateMoment } from '../../lib/date/date';
import { DatePicker } from 'antd';
import PropTypes from 'prop-types';
import { getCheckinsByDay } from '../Checkins/Collection/reducer';
import styles from './history.module.css';
import TeamDayCheckins from '../Checkins/Collection/team-daily-summary';
import { getActiveTeam } from '../ActiveTeam/reducer';

const mapStateToProps = (state) => ({
  getCheckins: (date) => {
    return getCheckinsByDay({
      checkins: state.checkins,
      date,
      teamId: getActiveTeam(state),
    });
  },
});

const History = ({ getCheckins }) => {
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
    <div className={styles.history}>
      <DatePicker
        className={styles.history__datePicker}
        value={dateValue}
        onChange={(date) => onDateChange(date)}
      />
      <TeamDayCheckins checkins={checkins} />
    </div>
  );
};

History.propTypes = {
  getCheckins: PropTypes.func,
};
export default connect(mapStateToProps)(History);
