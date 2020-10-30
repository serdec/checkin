import React from 'react';
import PropTypes from 'prop-types';
import StepsContainer from '../../Steps/steps-container';
import styles from '../checkins.module.css';
export const NewCheckin = ({
  checkin = {},
  user = {},
  checkinActions = {},
} = {}) => {
  return (
    <div className={styles.newCheckin}>
      <StepsContainer
        checkin={checkin}
        user={user}
        checkinActions={checkinActions}
      />
    </div>
  );
};

NewCheckin.propTypes = {
  checkin: PropTypes.object,
  checkinActions: PropTypes.object,
  user: PropTypes.object,
};
export default NewCheckin;
