import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getDateString, getDateMoment } from '../../lib/date/date';
import { Calendar } from 'antd';
import PropTypes from 'prop-types';
import { getCheckinsByDay } from '../Checkins/Collection/reducer';
import styles from './history.module.css';
import TeamDayCheckins from '../Checkins/Collection/team-daily-summary';
import { getActiveTeamId } from '../ActiveTeam/reducer';
import CalendarCell from './CalendarCell/calendar-cell';

const mapStateToProps = (state) => ({
  getCheckins: (date) => {
    return getCheckinsByDay({
      checkins: state.checkins,
      date,
      teamId: getActiveTeamId(state.activeTeam),
    });
  },
});

export const History = ({ getCheckins }) => {
  const [checkins, setVisibleCheckins] = useState([]);
  const [dateValue, setDateValue] = useState(getDateMoment(new Date()));

  useEffect(() => {
    setVisibleCheckins(getCheckins(getDateString(dateValue)));
  }, [getCheckins, dateValue]);

  const onDateChange = (date) => {
    setDateValue(date);
    setVisibleCheckins(getCheckins(getDateString(date)));
  };

  const dateFullCellRender = (date) => {
    const checkins = getCheckins(getDateString(date));
    const value = checkins.length < 4 ? checkins.length : 4;

    return (
      <CalendarCell colorValue={value} date={date} selectedDate={dateValue} />
    );
  };

  return (
    <div className={styles.history}>
      <Calendar
        fullscreen={false}
        className={styles.history__calendar}
        dateFullCellRender={dateFullCellRender}
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
