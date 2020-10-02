import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';

import styles from './cards.module.css';

const { Header, Content } = Layout;

const Card = ({ title = '', img = '', children = [], size = 'big' } = {}) => {
  return (
    <div className={`${styles.card} ${styles[size]}`}>
      <Layout className={styles.cardLayout}>
        <Header className={styles.cardHeader}>
          <h1 className={styles.cardTitle}>{title}</h1>
        </Header>
        <Content className={styles.cardContent}>
          <img className={styles.cardImg} src={img} />
          {children}
        </Content>
      </Layout>
    </div>
  );
};
Card.propTypes = {
  children: PropTypes.any,
  img: PropTypes.string,
  size: PropTypes.string,
  title: PropTypes.string,
};
export default Card;
