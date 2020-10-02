import React, { useState } from 'react';
import Link from 'next/link';
import { Menu } from 'antd';
import PropTypes from 'prop-types';
import { LoadingOutlined } from '@ant-design/icons';

const menuStyle = {
  position: 'relative',
  display: 'flex',
  justifyContent: 'flex-end',
  marginRight: '',
};
const LOGOUT = 'logout';
const SIGNIN = 'SignIn';

const AppHeader = ({ isSignedIn, signOut }) => {
  const [isLoggingOut, setLoggingOut] = useState(false);

  const handleClick = async ({ key }) => {
    if (key === LOGOUT) {
      setLoggingOut(true);
      signOut();
    }
  };
  return (
    <Menu
      style={menuStyle}
      theme="light"
      mode="horizontal"
      onClick={handleClick}
    >
      {isSignedIn ? (
        <Menu.Item
          key={LOGOUT}
          icon={isLoggingOut ? <LoadingOutlined /> : undefined}
        >
          Logout
        </Menu.Item>
      ) : (
        <Menu.Item key={SIGNIN}>
          <Link href="/login">
            <a>Login</a>
          </Link>
        </Menu.Item>
      )}
    </Menu>
  );
};

AppHeader.propTypes = {
  isSignedIn: PropTypes.bool,
  signOut: PropTypes.func,
};
export default AppHeader;
