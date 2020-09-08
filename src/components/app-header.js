import React from 'react';
import { Menu } from 'antd';

const menuStyle = {
  position: 'relative',
  display: 'flex',
  justifyContent: 'flex-end',
  marginRight: '',
};

const AppHeader = () => {
  return (
    <Menu style={menuStyle} theme="light" mode="horizontal">
      <Menu.Item key="1">
        <a href="/login">Login</a>
      </Menu.Item>
    </Menu>
  );
};

export default AppHeader;
