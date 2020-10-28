import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Layout, Menu } from 'antd';
import { createTeam, getTeams, getTeamsVisibility } from './Teams/reducer';
import withUser from '../lib/magic/with-user';
import styles from './app.module.css';
import TeamCreationInput from './Sider/team-creation-input';
import { getActiveTeam, setActiveTeam } from './ActiveTeam/reducer';
const { Sider } = Layout;

const mapStateToProps = (state) => ({
  teams: getTeams(state.teams),
  visible: getTeamsVisibility(state.teams),
  activeTeam: getActiveTeam(state),
});

const mapDispatchToProps = (dispatch) => ({
  createTeam: (owner) => (teamName) =>
    dispatch(createTeam({ name: teamName, owner })),
  setActiveTeam: (team) => dispatch(setActiveTeam(team)),
});

const AppSider = ({
  createTeam,
  setActiveTeam,
  teams = [],
  activeTeam = '',
  visible = true,
  user = {},
} = {}) => {
  const [inputTeamName, setInputTeamName] = useState(false);
  useEffect(() => {
    if (teams.length > 0 && activeTeam.length === 0) {
      setActiveTeam(teams[0].id);
    }
  }, [teams, setActiveTeam, activeTeam]);

  const handleCreate = () => {
    setInputTeamName(true);
  };

  const handleMenuClick = ({ key }) => {
    setActiveTeam(key);
  };

  return (
    <Sider
      collapsible
      collapsed={!visible}
      trigger={null}
      theme="light"
      collapsedWidth="0"
    >
      <div className={styles.siteLayoutSider}>
        <Menu
          mode="inline"
          selectedKeys={activeTeam}
          style={{ height: '100%', borderRight: 0, backgroundColor: 'white' }}
          onClick={handleMenuClick}
        >
          {teams.map((team) => (
            <Menu.Item key={team.id}>{team.name}</Menu.Item>
          ))}
        </Menu>
        {inputTeamName ? (
          <TeamCreationInput
            createTeam={createTeam(user.email)}
            onDone={() => {
              setInputTeamName(false);
            }}
          />
        ) : (
          <Button
            className={styles.controlPanelButton}
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
  activeTeam: PropTypes.string,
  createTeam: PropTypes.func,
  setActiveTeam: PropTypes.func,
  teams: PropTypes.array,
  visible: PropTypes.bool,
  user: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(withUser(AppSider));
