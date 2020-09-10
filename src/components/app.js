import React from 'react';
import PropTypes from 'prop-types';
import AppHeader from './app-header';
import AppContent from './app-content';
import AppSider from './app-sider';
import { Layout } from 'antd';
import withUser from '../lib/magic/with-user';

import styles from './app.module.css';

const { Header, Content } = Layout;
const App = ({ isSignedIn, isUserReady, signOut, user }) => (
  <Layout>
    <Header className={styles.header}>
      <AppHeader
        isSignedIn={isSignedIn}
        isUserReady={isUserReady}
        signOut={signOut}
        user={user}
      />
    </Header>
    <Layout>
      {isUserReady && isSignedIn ? (
        <>
          <AppSider />
          <Content theme="light" className={styles.siteLayoutContent}>
            <AppContent />
          </Content>
        </>
      ) : (
        <div></div>
      )}
    </Layout>
  </Layout>
);

App.propTypes = {
  createTeam: PropTypes.func,
  isSignedIn: PropTypes.bool,
  isUserReady: PropTypes.bool,
  signOut: PropTypes.func,
  teams: PropTypes.array,
  user: PropTypes.object,
};

export default withUser(App);
