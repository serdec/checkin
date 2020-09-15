import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Layout, Menu } from 'antd';
import { createTeam } from './Teams/team-reducer';
import withUser from '../lib/magic/with-user';
import styles from './app.module.css';
import TeamCreationInput from './Sider/team-creation-input';
import { setActiveTeam } from './Teams/active-team-reducer';
const { Sider } = Layout;

const mapStateToProps = (state) => ({
  teams: state.teams,
  activeTeam: state.activeTeam,
});

const mapDispatchToProps = (dispatch) => ({
  createTeam: (owner) => (teamName) =>
    dispatch(createTeam({ name: teamName, owner })),
  setActiveTeam: (team) => dispatch(setActiveTeam(team)),
});

const AppSider = ({
  createTeam,
  setActiveTeam,
  activeTeam,
  teams = [],
  user,
} = {}) => {
  const [inputTeamName, setInputTeamName] = useState(false);

  const handleCreate = () => {
    setInputTeamName(true);
  };

  const handleMenuClick = ({ key }) => {
    setActiveTeam(key);
  };

  return (
    <div className={styles.siteLayoutSider}>
      <Sider theme="light">
        <Menu
          mode="inline"
          defaultSelectedKeys={activeTeam}
          style={{ height: '100%', borderRight: 0 }}
          onClick={handleMenuClick}
        >
          {teams.map((team) => (
            <Menu.Item key={team.id}>{team.name}</Menu.Item>
          ))}
        </Menu>
        {inputTeamName ? (
          <TeamCreationInput
            onDone={() => setInputTeamName(false)}
            createTeam={createTeam(user.email)}
          />
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
  activeTeam: PropTypes.string,
  createTeam: PropTypes.func,
  setActiveTeam: PropTypes.func,
  teams: PropTypes.array,
  user: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(withUser(AppSider));
