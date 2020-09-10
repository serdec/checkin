import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import styles from '../app.module.css';
import { createTeam } from './team-reducer';
import { updateTeam } from './team-reducer';

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

const Teams = ({ teams = [], createTeam, updateTeamName } = {}) => {
  return (
    <div className={styles.box}>
      <h1>Your Teams</h1>
      <div className={styles.boxCard}>
        {/* {teams.map((team) => ())} */}

        <Button onClick={createTeam}>Create New Team</Button>
      </div>
    </div>
  );
};

Teams.propTypes = {
  teams: PropTypes.array,
  createTeam: PropTypes.func,
  updateTeamName: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Teams);
