import React from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

const { TextArea } = Input;
const noop = () => {};

const Feedback = ({ setFeedback = noop, value = '' }) => (
  <div className={styles.feedbackContainer}>
    <TextArea
      onChange={(e) => {
        const value = e.target.value;
        setFeedback(value);
      }}
      value={value}
    />
  </div>
);

Feedback.propTypes = {
  setFeedback: PropTypes.func,
  value: PropTypes.string,
};

export default Feedback;
