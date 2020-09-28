import React from 'react';
import DevControls from './DevControls/dev-controls';
import UserControls from './UserControls/user-controls';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

const noop = () => {};

const ControlPanel = ({
  teams = [],
  setVisibleCheckinHistory = noop,
  setSimulateNetServError = noop,
  simulateNetServError = false,
} = {}) => (
  <div className={styles.controlPanel}>
    <UserControls
      teams={teams}
      setVisibleCheckinHistory={setVisibleCheckinHistory}
    />
    <DevControls
      setSimulateNetServError={setSimulateNetServError}
      simulateNetServError={simulateNetServError}
    />
  </div>
);

ControlPanel.propTypes = {
  setSimulateNetServError: PropTypes.func,
  setVisibleCheckinHistory: PropTypes.func,
  simulateNetServError: PropTypes.bool,
  teams: PropTypes.array,
};

export default ControlPanel;
