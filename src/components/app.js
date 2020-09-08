import React from 'react';
import PropTypes from 'prop-types';
import AppHeader from './app-header';
import AppContent from './app-content';
import AppSider from './app-sider';
import { Layout } from 'antd';
import styles from './app.module.css';

const { Header, Content } = Layout;
const App = () => (
  <Layout>
    <Header className={styles.header}>
      <AppHeader />
    </Header>
    <Layout>
      <AppSider />
      <Content theme="light" className={styles.siteLayoutContent}>
        <AppContent />
      </Content>
    </Layout>
  </Layout>
);

App.propTypes = {
  teams: PropTypes.array,
  createTeam: PropTypes.func,
};

export default App;
