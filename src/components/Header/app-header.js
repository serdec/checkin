import React, { useState } from 'react';
import { Button, Divider } from 'antd';
import PropTypes from 'prop-types';
import styles from './app-header.module.css';
import {
  LoadingOutlined,
  LogoutOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { toggleTeamsVisibility } from '../Teams/reducer';
import { connect } from 'react-redux';
import { useRouter } from 'next/dist/client/router';

const mapDispatchToProps = {
  toggleTeamsVisibility,
};

export const AppHeader = ({ isSignedIn, signOut, toggleTeamsVisibility }) => {
  const router = useRouter();
  const [isLoggingOut, setLoggingOut] = useState(false);

  const logoutIcon = isLoggingOut ? <LoadingOutlined /> : <LogoutOutlined />;

  const handleLogout = () => {
    setLoggingOut(true);
    signOut();
  };
  return (
    <>
      <div className={styles.appHeader}>
        <Button
          className={`${styles.appHeader__teamsButton} ${styles.appHeader__button}`}
          onClick={toggleTeamsVisibility}
        >
          <TeamOutlined /> Teams
        </Button>
        {isSignedIn ? (
          <Button
            onClick={handleLogout}
            className={`${styles.appHeader__logoutButton} ${styles.appHeader__button}`}
          >
            {logoutIcon} Logout
          </Button>
        ) : (
            <Button
              onClick={() => router.push('/login')}
              className={`${styles.appHeader__loginButton} ${styles.appHeader__button}`}
            >
              Login
            </Button>
          )}
      </div>
      <Divider />
    </>
  );
};

AppHeader.propTypes = {
  isSignedIn: PropTypes.bool,
  signOut: PropTypes.func,
  toggleTeamsVisibility: PropTypes.func,
};
export default connect(null, mapDispatchToProps)(AppHeader);
