import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { useRouter } from 'next/dist/client/router';
import { getActiveTeam } from '../ActiveTeam/reducer';
import { Button, Divider } from 'antd';
import PropTypes from 'prop-types';
import styles from './app-header.module.css';
import {
  HomeOutlined,
  LoadingOutlined,
  LoginOutlined,
  LogoutOutlined,
  TeamOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { toggleTeamsVisibility } from '../Teams/reducer';
import AppHeader__LinkButton from './__LinkButton/app-header__link-button';

const mapStateToProps = (state) => ({
  activeTeam: getActiveTeam(state.activeTeam),
});
const mapDispatchToProps = {
  toggleTeamsVisibility,
};

export const AppHeader = ({
  activeTeam,
  isSignedIn,
  signOut,
  toggleTeamsVisibility,
}) => {
  const router = useRouter();
  const [isLoggingOut, setLoggingOut] = useState(false);
  const [logoutIcon, setLogoutIcon] = useState(null);

  useEffect(() => {
    isLoggingOut
      ? setLogoutIcon(<LoadingOutlined />)
      : setLogoutIcon(<LogoutOutlined />);
  }, [isLoggingOut]);

  const handleLogout = () => {
    setLoggingOut(true);
    signOut();
  };
  return (
    <div>
      <div className={styles.appHeader}>
        {isSignedIn ? (
          <>
            <div>
              <Button
                icon={logoutIcon}
                onClick={handleLogout}
                className={`${styles.appHeader__logoutButton} ${styles.appHeader__button}`}
              >
                Logout
              </Button>
            </div>
            <div className={`${styles.appHeader__teams}`}>
              <AppHeader__LinkButton
                label={'Home'}
                href={'/'}
                icon={<HomeOutlined />}
              />
              <Button
                className={`${styles.appHeader__teamsButton} ${styles.appHeader__button}`}
                onClick={toggleTeamsVisibility}
              >
                <UnorderedListOutlined /> Teams
              </Button>
              <AppHeader__LinkButton
                label={activeTeam.name}
                href={`/team/${activeTeam.id}`}
                icon={<TeamOutlined />}
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <Button
                onClick={() => router.push('/login')}
                className={`${styles.appHeader__loginButton} ${styles.appHeader__button}`}
              >
                <LoginOutlined /> Login
              </Button>
            </div>
          </>
        )}
      </div>
      <Divider style={{ margin: '5px' }} />
    </div>
  );
};

AppHeader.propTypes = {
  activeTeam: PropTypes.object,
  isSignedIn: PropTypes.bool,
  signOut: PropTypes.func,
  user: PropTypes.object,
  addUsers: PropTypes.func,
  toggleTeamsVisibility: PropTypes.func,
};
export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);
