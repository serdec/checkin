import React from 'react';
import Card from '../card';
import PropTypes from 'prop-types';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import styles from '../styles.module.css';

const ListSummaryCard = ({ list = {}, checkin = {} } = {}) => (
  <Card title={list.title} size="small">
    <div className={styles.summaryCard}>
      {checkin[list.content].map((item) => (
        <li key={item.id}>
          {item.active ? <CheckOutlined /> : <CloseOutlined />} {item.value}
        </li>
      ))}
    </div>
  </Card>
);

ListSummaryCard.propTypes = {
  list: PropTypes.object,
  checkin: PropTypes.object,
};

export default ListSummaryCard;
