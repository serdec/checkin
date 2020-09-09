import React from 'react';
import Link from 'next/link';
import { Menu, Button } from 'antd';
import PropTypes from 'prop-types';
import withUser from '../lib/magic/with-user';

const menuStyle = {
  position: 'relative',
  display: 'flex',
  justifyContent: 'flex-end',
  marginRight: '',
};
const LOGOUT = 'logout';
const SIGNIN = 'SignIn';

const AppHeader = ({ isSignedIn, isUserReady, signOut }) => {
  const handleClick = async ({ key }) => {
    if (key === LOGOUT) {
      console.log('signing out');
      await signOut();
    }
  };
  return (
    <div>
      <Button onClick={() => console.log({ isSignedIn })}>headerButton</Button>
      <Menu
        style={menuStyle}
        theme="light"
        mode="horizontal"
        onClick={handleClick}
      >
        {isUserReady && isSignedIn ? (
          <Menu.Item key={LOGOUT}>Logout</Menu.Item>
        ) : (
          <Menu.Item key={SIGNIN}>
            <Link href="/login">
              <a>Login</a>
            </Link>
          </Menu.Item>
        )}
      </Menu>
    </div>
  );
};

AppHeader.propTypes = {
  isSignedIn: PropTypes.bool,
  isUserReady: PropTypes.bool,
  signOut: PropTypes.func,
};
export default withUser(AppHeader);
