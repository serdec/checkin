import React from 'react';
import { Spin } from 'antd';
import appStyles from '../../app.module.css';
import styles from './styles.module.css';

const Loading = () => (
  <div className={styles.loadingComponent}>
    <Spin className={appStyles.centralBox} size="large" tip="Loading...." />
  </div>
);

export default Loading;
