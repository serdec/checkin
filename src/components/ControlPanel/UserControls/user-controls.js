import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import styles from '../styles.module.css';

const noop = () => {};
const UserControls = ({ teams = [], setVisibleCheckinHistory = noop } = {}) => (
  <div className={styles.userControlsBox}>
    <Button
      className={styles.controlPanelButton}
      onClick={() => setVisibleCheckinHistory(true)}
    >
      View Checkins
    </Button>
    {teams.length > 0 ? (
      <Button
        className={styles.controlPanelButton}
        onClick={() => setVisibleCheckinHistory(false)}
      >
        New Checkin
      </Button>
    ) : (
      <h3 style={{ display: 'inline' }}> Create a team...</h3>
    )}
  </div>
);

UserControls.propTypes = {
  teams: PropTypes.array,
  setVisibleCheckinHistory: PropTypes.func,
};
export default UserControls;
