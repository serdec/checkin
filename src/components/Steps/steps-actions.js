import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import styles from './steps.module.css';

const noop = () => {
  return;
};
const StepsActions = ({
  step = 0,
  prev = noop,
  next = noop,
  action = noop,
  steps = {},
} = {}) => {
  return (
    <div className={styles.stepsActions}>
      {step > 0 && (
        <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
          Previous
        </Button>
      )}
      {step < steps.length - 1 && (
        <Button type="primary" onClick={() => next()}>
          Next
        </Button>
      )}
      {step === steps.length - 1 && (
        <Button type="primary" onClick={action}>
          Done
        </Button>
      )}
    </div>
  );
};

StepsActions.propTypes = {
  step: PropTypes.number,
  prev: PropTypes.func,
  next: PropTypes.func,
  steps: PropTypes.array,
  action: PropTypes.func,
};
export default StepsActions;
