import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/dist/client/router';
import { getActiveTeamId, getActiveTeamOwner } from '../ActiveTeam/reducer';
import { Button, Divider } from 'antd';
import PropTypes from 'prop-types';
import styles from './app-header.module.css';
import {
  LoadingOutlined,
  LogoutOutlined,
  PlusOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { addMembers, toggleTeamsVisibility } from '../Teams/reducer';

const mapStateToProps = (state) => ({
  activeTeamId: getActiveTeamId(state.activeTeam),
  activeTeamOwner: getActiveTeamOwner(state.activeTeam),
});
const mapDispatchToProps = {
  toggleTeamsVisibility,
  addMembers,
};

export const AppHeader = ({
  activeTeamId,
  activeTeamOwner,
  user,
  isSignedIn,
  signOut,
  addMembers,
  toggleTeamsVisibility,
}) => {
  const router = useRouter();
  const [isLoggingOut, setLoggingOut] = useState(false);
  const [idActiveTeam, setActiveTeamId] = useState(null);
  const [logoutIcon, setLogoutIcon] = useState(null);

  useEffect(() => {
    isLoggingOut
      ? setLogoutIcon(<LoadingOutlined />)
      : setLogoutIcon(<LogoutOutlined />);
  }, [isLoggingOut]);

  useEffect(() => {
    setActiveTeamId(activeTeamId);
  }, [activeTeamId]);

  const handleLogout = () => {
    setLoggingOut(true);
    signOut();
  };
  return (
    <>
      <div className={styles.appHeader}>
        {isSignedIn ? (
          <>
            <div>
              <Button
                onClick={handleLogout}
                className={`${styles.appHeader__logoutButton} ${styles.appHeader__button}`}
              >
                {logoutIcon} Logout
              </Button>
            </div>
            <div>
              <Button
                className={`${styles.appHeader__teamsButton} ${styles.appHeader__button}`}
                onClick={toggleTeamsVisibility}
              >
                <TeamOutlined /> Teams
              </Button>
              {activeTeamOwner === user.email && idActiveTeam && (
                <Button
                  className={`${styles.appHeader__addMemberButton} ${styles.appHeader__button}`}
                  onClick={() =>
                    addMembers({ teamId: activeTeamId, users: ['testuser'] })
                  }
                >
                  <PlusOutlined /> Invite New Members
                </Button>
              )}
            </div>
          </>
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
  activeTeam: PropTypes.object,
  activeTeamId: PropTypes.string,
  activeTeamOwner: PropTypes.string,
  isSignedIn: PropTypes.bool,
  signOut: PropTypes.func,
  user: PropTypes.object,
  addMembers: PropTypes.func,
  toggleTeamsVisibility: PropTypes.func,
};
export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);
