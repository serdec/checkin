import React from 'react';
import { Layout, Menu } from 'antd';
import styles from './app.module.css';

const { Header } = Layout;

const menuStyle = {
  position: 'relative',
  display: 'flex',
  justifyContent: 'flex-end',
  marginRight: '',
};

const AppHeader = () => {
  return (
    <Header className={styles.header}>
      <Menu style={menuStyle} theme="light" mode="horizontal">
        <Menu.Item key="1">
          <a href="/login">Login</a>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default AppHeader;
