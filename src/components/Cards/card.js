import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';

import styles from './cards.module.css';

const { Header, Content } = Layout;

const Card = ({ className = '', title = '', img = '', children = [] } = {}) => {
  return (
    <div
      className={`${styles.card} ${styles.card_margin_1} ${styles.card_large} ${className}`}
    >
      <Layout className={styles.card__layout}>
        <Header className={styles.card__header}>
          <h1 className={styles.card__title}>{title}</h1>
        </Header>
        <Content className={styles.card__content}>
          <img className={styles.card__img} src={img} />
          {children}
        </Content>
      </Layout>
    </div>
  );
};
Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  img: PropTypes.string,
  title: PropTypes.string,
};
export default Card;
