import React, { useState } from 'react';
import Link from 'next/link';
import { Menu } from 'antd';
import PropTypes from 'prop-types';
import styles from './app-header.module.css';
import {
  LoadingOutlined,
  LogoutOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { toggleTeamsVisibility } from '../Teams/reducer';
import { connect } from 'react-redux';

const menuStyle = {
  position: 'relative',
  display: 'flex',
  justifyContent: 'flex-end',
  marginRight: '',
};
const LOGOUT = 'logout';
const LOGIN = 'signIn';
const TEAMS = 'teams';

const mapDispatchToProps = {
  toggleTeamsVisibility,
};

export const AppHeader = ({ isSignedIn, signOut, toggleTeamsVisibility }) => {
  const [isLoggingOut, setLoggingOut] = useState(false);

  const signedInMenu = [
    {
      key: TEAMS,
      icon: <TeamOutlined />,
      label: 'Teams',
      className: styles.appHeader__teamsButton,
    },
    {
      key: LOGOUT,
      icon: isLoggingOut ? <LoadingOutlined /> : <LogoutOutlined />,
      label: 'Logout',
      className: styles.appHeader__logoutButton,
    },
  ];

  const handleClick = async ({ key }) => {
    if (key === LOGOUT) {
      setLoggingOut(true);
      signOut();
    }
    if (key === TEAMS) {
      toggleTeamsVisibility();
    }
  };
  return (
    <div className={styles.appHeader}>
      <Menu
        style={menuStyle}
        theme="light"
        mode="horizontal"
        onClick={handleClick}
        selectedKeys={null}
      >
        {isSignedIn ? (
          signedInMenu.map((item) => (
            <Menu.Item
              key={item.key}
              icon={item.icon}
              className={item.className}
            >
              {item.label}
            </Menu.Item>
          ))
        ) : (
          <Menu.Item key={LOGIN} className={styles.appHeader__loginButton}>
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
  signOut: PropTypes.func,
  toggleTeamsVisibility: PropTypes.func,
};
export default connect(null, mapDispatchToProps)(AppHeader);
