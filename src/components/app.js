import React from 'react';
import PropTypes from 'prop-types';
import AppHeader from './app-header';
import AppContent from './app-content';
import AppSider from './app-sider';
import { Layout, Button } from 'antd';
import withUser from '../lib/magic/with-user';

import styles from './app.module.css';

const { Header, Content } = Layout;
const App = ({ isSignedIn, isUserReady }) => {
  const handle = () => console.log({ isSignedIn });
  return (
    <Layout>
      <Button onClick={handle}>isSignedIn</Button>
      <Header className={styles.header}>
        <AppHeader />
      </Header>
      <Layout>
        <AppSider />
        <Content theme="light" className={styles.siteLayoutContent}>
          {isUserReady && isSignedIn ? <AppContent /> : <div></div>}
        </Content>
      </Layout>
    </Layout>
  );
};
App.propTypes = {
  isSignedIn: PropTypes.bool,
  isUserReady: PropTypes.bool,
  teams: PropTypes.array,
  createTeam: PropTypes.func,
};

export default withUser(App);
