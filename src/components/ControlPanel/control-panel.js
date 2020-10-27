import React from 'react';
import UserControls from './UserTools/user-tools';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

const noop = () => {};

const ControlPanel = ({
  teams = [],
  createNewCheckin = noop,
  setVisibleCheckinHistory = noop,
} = {}) => (
  <div className={styles.controlPanel}>
    <UserControls
      teams={teams}
      createNewCheckin={createNewCheckin}
      setVisibleCheckinHistory={setVisibleCheckinHistory}
    />
  </div>
);

ControlPanel.propTypes = {
  simulateNetServError: PropTypes.bool,
  teams: PropTypes.array,
  createNewCheckin: PropTypes.func,
  setSimulateNetServError: PropTypes.func,
  setVisibleCheckinHistory: PropTypes.func,
};

export default ControlPanel;
