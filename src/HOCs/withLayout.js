import React, { useState, useEffect } from 'react';
import AppHeader from '../components/Header/app-header';
import { Layout } from 'antd';

import styles from '../components/app.module.css';
import AppSider from '../components/Sider/app-sider';

const { Header, Content } = Layout;
const withLayout = (Component) => (props) => {
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);

  // fixes hydration mismathch
  useEffect(() => {
    setIsUserSignedIn(props.isSignedIn);
  }, [props.isSignedIn]);

  return (
    <Layout>
      <Header className={styles.header}>
        <AppHeader
          isSignedIn={isUserSignedIn}
          signOut={props.signOut}
          user={props.user}
        />
      </Header>
      <Layout>
        {isUserSignedIn && (
          <Content className={styles.externalContent}>
            <Layout>
              <AppSider />
              <Content className={styles.siteLayoutContent}>
                <Component {...props} />
              </Content>
            </Layout>
          </Content>
        )}
      </Layout>
    </Layout>
  );
};

export default withLayout;
