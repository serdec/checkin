import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Layout, Menu } from 'antd';

import { createTeam, updateTeam } from './Teams/team-reducer';

import styles from './app.module.css';
import TeamCreationInput from './Sider/team-creation-input';

const { Sider } = Layout;
let lastUpdate;

const teamUpdateName = (dispatch) => (team, newName) => {
  const newTeam = {
    ...team,
    name: newName,
  };
  clearTimeout(lastUpdate);
  lastUpdate = setTimeout(() => {
    dispatch(updateTeam(newTeam));
  }, 2000);
};
const mapStateToProps = (state) => ({
  teams: state.teams,
});

const mapDispatchToProps = (dispatch) => ({
  createTeam: () => {
    dispatch(createTeam({ name: 'MyTeam', img: 'team.png' }));
  },
  updateTeamName: teamUpdateName(dispatch),
});

const AppSider = ({ teams = [], createTeam } = {}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [inputTeamName, setInputTeamName] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleCreate = () => {
    setInputTeamName(true);
  };
  return (
    <div className={styles.siteLayoutSider}>
      <Sider theme="light">
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          {teams.map((team) => (
            <Menu.Item key={team.id}>{team.name}</Menu.Item>
          ))}
        </Menu>
        {inputTeamName ? (
          <TeamCreationInput onDone={() => setInputTeamName(false)} />
        ) : (
          <Button style={{ margin: '0.5em' }} onClick={handleCreate}>
            Create New Team
          </Button>
        )}
      </Sider>
    </div>
  );
};

AppSider.propTypes = {
  teams: PropTypes.array,
  createTeam: PropTypes.func,
  updateTeamName: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppSider);
