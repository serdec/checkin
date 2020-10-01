import React from 'react';
import DevControls from './DevTools/dev-tools';
import UserControls from './UserTools/user-tools';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

const noop = () => {};

const ControlPanel = ({
  teams = [],
  simulateNetServError = false,
  createNewCheckin = noop,
  setVisibleCheckinHistory = noop,
  setSimulateNetServError = noop,
} = {}) => (
  <div className={styles.controlPanel}>
    <UserControls
      teams={teams}
      createNewCheckin={createNewCheckin}
      setVisibleCheckinHistory={setVisibleCheckinHistory}
    />
    <DevControls
      setSimulateNetServError={setSimulateNetServError}
      simulateNetServError={simulateNetServError}
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
