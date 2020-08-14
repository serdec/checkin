import React from 'react';
import { Button, message } from 'antd';
import PropTypes from 'prop-types';
import styles from '../checkin-content.module.css';

const noop = () => {
  return;
};
const StepsActions = ({
  current = 0,
  prev = noop,
  next = noop,
  submitForm = noop,
  steps = {},
} = {}) => {
  return (
    <div className={styles.stepsAction}>
      {current > 0 && (
        <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
          Previous
        </Button>
      )}
      {current < steps.length - 1 && (
        <Button type="primary" onClick={() => next()}>
          Next
        </Button>
      )}
      {current === steps.length - 1 && (
        <Button type="primary" onClick={submitForm}>
          Done
        </Button>
      )}
    </div>
  );
};

StepsActions.propTypes = {
  current: PropTypes.number,
  prev: PropTypes.func,
  next: PropTypes.func,
  steps: PropTypes.array,
  submitForm: PropTypes.func,
};
export default StepsActions;
