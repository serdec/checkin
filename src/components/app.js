import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppHeader from './Header/app-header';
import AppContent from './app-content';
import AppSider from './app-sider';
import { Layout } from 'antd';
import withUser from '../lib/magic/with-user';

import styles from './app.module.css';

const { Header, Content } = Layout;
const App = ({ isSignedIn, isUserReady, signOut, user }) => {
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);

  // fixes hydration mismathch
  useEffect(() => {
    setIsUserSignedIn(isSignedIn);
  }, [isSignedIn]);

  return (
    <Layout>
      <Header className={styles.header}>
        <AppHeader
          isSignedIn={isUserSignedIn}
          isUserReady={isUserReady}
          signOut={signOut}
          user={user}
        />
      </Header>
      <Layout>
        {isUserSignedIn && (
          <Content
            style={{
              backgroundColor: 'white',
              padding: '2em 0',
            }}
          >
            <Layout>
              <AppSider />
              <Content theme="light" className={styles.siteLayoutContent}>
                <AppContent />
              </Content>
            </Layout>
          </Content>
        )}
      </Layout>
    </Layout>
  );
};

App.propTypes = {
  createTeam: PropTypes.func,
  isSignedIn: PropTypes.bool,
  isUserReady: PropTypes.bool,
  signOut: PropTypes.func,
  teams: PropTypes.array,
  user: PropTypes.object,
};

export default withUser(App);
