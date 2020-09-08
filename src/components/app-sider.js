import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Input, Layout, Menu, Dropdown } from 'antd';
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { addTeam } from '../reducers/teams/teamsCollection/teams-collection';
import { updateTeam } from '../reducers/teams/team/team';

import styles from './app.module.css';

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
    dispatch(addTeam({ name: 'MyTeam', img: 'team.png' }));
  },
  updateTeamName: teamUpdateName(dispatch),
});

const AppSider = ({ teams, createTeam }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={styles.siteLayoutSider}>
      {/* <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{ marginBottom: 16 }}
      >
        {collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
      </Button> */}
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
        <Button onClick={createTeam}>Create New Team</Button>
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
