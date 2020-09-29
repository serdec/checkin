import React from 'react';
import Card from '../card';
import PropTypes from 'prop-types';
import styles from '../styles.module.css';

const FeedbackSummaryCard = ({ feedback = {}, checkin = {} } = {}) => (
  <Card title={feedback.title} size="small">
    <div className={styles.summaryCard}>{checkin[feedback.content]}</div>
  </Card>
);

FeedbackSummaryCard.propTypes = {
  feedback: PropTypes.object,
  checkin: PropTypes.object,
};

export default FeedbackSummaryCard;
