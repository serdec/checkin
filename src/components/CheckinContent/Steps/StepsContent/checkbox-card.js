import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import CheckinForm from './CheckboxContent/checkbox-form';

import styles from '../../checkin-content.module.css';

const { Header, Content } = Layout;
const noop = () => {
  return;
};
const CheckboxCard = ({
  title = '',
  img = '',
  checkList = [],
  onAddClick = noop,
  onDeleteClick = noop,
} = {}) => {
  return (
    <div className={styles.card}>
      <Layout className={styles.cardLayout}>
        <Header className={styles.cardHeader}>
          <h1 className={styles.cardTitle}>{title}</h1>
        </Header>
        <Content className={styles.cardContent}>
          <CheckinForm
            checkList={checkList}
            img={img}
            onAddClick={onAddClick}
            onDeleteClick={onDeleteClick}
          />
        </Content>
      </Layout>
    </div>
  );
};
CheckboxCard.propTypes = {
  title: PropTypes.string,
  img: PropTypes.string,
  checkList: PropTypes.array,
  onAddClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
};
export default CheckboxCard;
