import React from 'react';
import { connect } from 'react-redux';
import { func, object } from 'prop-types';
import styles from './team.module.css';
import Team__SimpleField from './__SimpleField/team__simple-field';
import Team__ArrayField from './__ArrayField/team__array-field';
import { removeUser, addUsers } from '../reducer';
import { getActiveTeam } from '../../ActiveTeam/reducer';
import page from '../../../HOCs/page';
import { Divider } from 'antd';

const _team = { name: '', id: '', members: [], owners: [] };
const teamProperties = ['members', 'owners'];

const mapStateToProps = (state) => ({
  team: getActiveTeam(state.activeTeam),
});
const mapDispatchToProps = {
  removeUser,
  addUsers,
};

const Team = ({ team = _team, addUsers, removeUser, user } = {}) => {
  return (
    <div className={styles.team}>
      <div className={styles.team__header}>
        <h2>{team.name} Team</h2>
      </div>
      {teamProperties.map((key) => {
        if (Array.isArray(team[key])) {
          return (
            <div key={key}>
              <Team__ArrayField
                listName={key}
                isOwner={team.owners.includes(user.email)}
                members={team[key]}
                user={user.email}
                teamId={team.id}
                addUsers={addUsers}
                removeUser={removeUser}
              />
              <Divider />
            </div>
          );
        } else {
          return (
            <div key={key}>
              <Team__SimpleField label={key} value={team[key]} />;
              <Divider />
            </div>
          );
        }
      })}
    </div>
  );
};
Team.propTypes = {
  team: object,
  user: object,
  addUsers: func,
  removeUser: func,
};
const ConnectedTeam = connect(mapStateToProps, mapDispatchToProps)(Team);
export default page(ConnectedTeam);
