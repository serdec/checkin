import React from 'react';
import Card from '../card';
import PropTypes from 'prop-types';
import styles from '../cards.module.css';

const FeedbackSummaryCard = ({
  feedback = {},
  checkin = {},
  size = 'small',
} = {}) => {
  const card_size = size === 'small' ? styles.card_small : styles.card_large;
  return (
    <Card title={feedback.title} className={card_size}>
      <div className={styles.summaryCard}>{checkin[feedback.content]}</div>
    </Card>
  );
};
FeedbackSummaryCard.propTypes = {
  feedback: PropTypes.object,
  checkin: PropTypes.object,
  size: PropTypes.string,
};

export default FeedbackSummaryCard;
