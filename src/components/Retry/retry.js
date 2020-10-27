import React from 'react';
import { Button } from 'antd';
import appStyles from '../app.module.css';
import styles from './styles.module.css';
import PropTypes from 'prop-types';

const noop = () => {};

const retry = {
  message: 'Something went wrong while saving your checkin...',
};
const Retry = ({ retryAction = noop } = {}) => (
  <div className={appStyles.centralBox}>
    <div className={styles.retryMessage}>
      <h2>{retry.message}</h2>
    </div>
    <div>
      <Button
        className={appStyles.centralBox__button}
        type="primary"
        onClick={retryAction}
      >
        Retry
      </Button>
    </div>
  </div>
);

Retry.propTypes = {
  retryAction: PropTypes.func,
};
export default Retry;
