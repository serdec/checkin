import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import styles from './date-log.module.css';

const TeamDayCheckins = ({ checkins = [] } = {}) => {
  return (
    <div className={styles.teamDayCheckins}>
      {checkins.map((checkin) => {
        return (
          <div key={checkin.id} className={styles.checkinPreview}>
            <Button type="secondary">{checkin.user}</Button>
            {JSON.stringify(checkin)}
          </div>
        );
      })}
    </div>
  );
};

TeamDayCheckins.propTypes = {
  checkins: PropTypes.array,
};

export default TeamDayCheckins;
