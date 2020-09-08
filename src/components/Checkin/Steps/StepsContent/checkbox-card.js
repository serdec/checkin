import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';

import styles from '../../checkin-content.module.css';

const { Header, Content } = Layout;

const CheckboxCard = ({ title = '', img = '', children = [] } = {}) => {
  return (
    <div className={styles.card}>
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
CheckboxCard.propTypes = {
  title: PropTypes.string,
  img: PropTypes.string,
  children: PropTypes.any,
};
export default CheckboxCard;
