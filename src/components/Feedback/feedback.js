import React from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

const { TextArea } = Input;
const noop = () => {};

const Feedback = ({
  feedbackName = '',
  setFeedback = noop,
  value = '',
} = {}) => (
  <div className={styles.feedbackContainer}>
    <TextArea
      onChange={(e) => {
        const value = e.target.value;
        setFeedback({ feedbackName, value });
      }}
      value={value}
    />
  </div>
);

Feedback.propTypes = {
  feedbackName: PropTypes.string,
  setFeedback: PropTypes.func,
  value: PropTypes.string,
};

export default Feedback;
