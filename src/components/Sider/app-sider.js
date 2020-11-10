import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Layout, Menu } from 'antd';
import styles from '../ControlPanel/control-panel.module.css';
import TeamCreationInput from './team-creation-input';
import { getActiveTeamId, setActiveTeam } from '../Teams/ActiveTeam/reducer';
import withUser from '../../lib/magic/with-user';
import { createTeam, getTeams, getTeamsVisibility } from '../Teams/reducer';
import { useRouter } from 'next/dist/client/router';
const { Sider } = Layout;

const mapStateToProps = (state) => ({
  teams: getTeams(state.teams),
  visible: getTeamsVisibility(state.teams),
  activeTeamId: getActiveTeamId(state.activeTeam),
});

const mapDispatchToProps = {
  createTeam,
  setActiveTeam,
};

const AppSider = ({
  createTeam,
  setActiveTeam,
  teams = [],
  activeTeamId = '',
  visible = true,
  user = {},
} = {}) => {
  const [inputTeamName, setInputTeamName] = useState(false);
  const [visibleSideBar, setVisibleSideBar] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (activeTeamId === '' && teams.length > 0) setActiveTeam(teams[0]);
  }, [activeTeamId, setActiveTeam, teams]);
  useEffect(() => {
    setVisibleSideBar(visible);
    if (teams.length > 0 && activeTeamId.length === 0) {
      setActiveTeam(teams[0]);
    }
    if (teams.length === 0) setVisibleSideBar(true);
  }, [teams, setActiveTeam, activeTeamId, visible]);

  const handleCreate = () => {
    setInputTeamName(true);
  };

  const handleMenuClick = ({ key }) => {
    const team = teams.filter((item) => item.id === key)[0];
    setActiveTeam(team);

    if (router.pathname.includes('/team')) {
      router.push(`/team/${team.id}`);
    }
  };

  return (
    <Sider
      collapsible
      collapsed={!visibleSideBar}
      trigger={null}
      theme="light"
      collapsedWidth="0"
    >
      <div className={styles.siteLayoutSider}>
        <Menu
          mode="inline"
          selectedKeys={activeTeamId}
          style={{ height: '100%', borderRight: 0, backgroundColor: 'white' }}
          onClick={handleMenuClick}
        >
          {teams.map((team) => (
            <Menu.Item key={team.id}>{team.name}</Menu.Item>
          ))}
        </Menu>
        {inputTeamName ? (
          <TeamCreationInput
            user={user.email}
            createTeam={createTeam}
            onDone={() => {
              setInputTeamName(false);
            }}
          />
        ) : (
          <Button
            className={styles.controlPanel__button}
            style={{ margin: '0.5em' }}
            onClick={handleCreate}
          >
            Create New Team
          </Button>
        )}
      </div>
    </Sider>
  );
};

AppSider.propTypes = {
  activeTeamId: PropTypes.string,
  createTeam: PropTypes.func,
  setActiveTeam: PropTypes.func,
  teams: PropTypes.array,
  visible: PropTypes.bool,
  user: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(withUser(AppSider));
