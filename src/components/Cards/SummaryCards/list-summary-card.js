import React from 'react';
import Card from '../card';
import PropTypes from 'prop-types';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import styles from '../cards.module.css';

const ListSummaryCard = ({
  title = '',
  list = [],
  img = '',
  size = 'small',
} = {}) => {
  const card_size = size === 'small' ? styles.card_small : styles.card_large;
  return (
    <Card title={title} img={img} className={card_size}>
      <div className={styles.summaryCard}>
        {list.map((item) => (
          <li key={item.id}>
            {item.checked ? <CheckOutlined /> : <CloseOutlined />} {item.value}
          </li>
        ))}
      </div>
    </Card>
  );
};

ListSummaryCard.propTypes = {
  list: PropTypes.array,
  img: PropTypes.string,
  size: PropTypes.string,
  title: PropTypes.string,
};

export default ListSummaryCard;
