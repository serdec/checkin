import React from 'react';
import { Switch } from 'antd';
import styles from '../styles.module.css';
import { PropTypes } from 'prop-types';

const noop = () => {};

const DevControls = ({
  setSimulateNetServError = noop,
  simulateNetServError = false,
} = {}) => (
  <div className={styles.devControlsBox}>
    <Switch
      size="small"
      className={styles.controlPanelSwitch}
      checked={simulateNetServError}
      onClick={() =>
        setSimulateNetServError((simulateNetServError) => !simulateNetServError)
      }
    />
    Simulate Server/Network Problem
  </div>
);

DevControls.propTypes = {
  setSimulateNetServError: PropTypes.func,
  simulateNetServError: PropTypes.bool,
};

export default DevControls;
