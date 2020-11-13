import React, { useState } from 'react';
import { connect } from 'react-redux';
import { func, object } from 'prop-types';
import styles from './team.module.css';
import Team__SimpleField from './__SimpleField/team__simple-field';
import Team__ArrayField from './__ArrayField/team__array-field';
import { addUsers, deleteTeam, getTeam, removeUser } from '../reducer';
import { getActiveTeamId, setActiveTeam } from '../ActiveTeam/reducer';
import page from '../../../HOCs/page';
import { Button, Divider } from 'antd';
import { DeleteOutlined, LogoutOutlined } from '@ant-design/icons';
import Modal from 'antd/lib/modal/Modal';
import { useRouter } from 'next/dist/client/router';

const _team = { name: '', id: '', members: [], owners: [] };
const teamProperties = ['members', 'owners'];

const mapStateToProps = (state) => ({
  team: getTeam(state.teams, getActiveTeamId(state.activeTeam)),
});
const mapDispatchToProps = {
  addUsers,
  deleteTeam,
  removeUser,
  setActiveTeam,
};

export const Team = ({
  team = _team,
  addUsers,
  deleteTeam,
  setActiveTeam,
  removeUser,
  user = {},
} = {}) => {
  const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);
  const [visibleLeaveGroupModal, setVisibleLeaveTeamModal] = useState(false);
  const router = useRouter();
  const isOwner = team.owners.includes(user.email);
  return (
    <div className={styles.team}>
      <div className={styles.team__header}>
        <h2>{team.name} Team</h2>
      </div>
      <div className={styles.team__delete}>
        <Button
          style={{ margin: '1em', borderRadius: '4px' }}
          onClick={() => setVisibleLeaveTeamModal(true)}
        >
          <LogoutOutlined />
          Leave Group
        </Button>
        <Modal
          visible={visibleLeaveGroupModal}
          onOk={() => {
            setVisibleLeaveTeamModal(false);
            setActiveTeam({ id: '' });
            removeUser({
              teamId: team.id,
              userId: user.email,
              listName: 'members',
            });
            router.push('/');
          }}
          onCancel={() => setVisibleLeaveTeamModal(false)}
        >
          <p>Are you sure you want to leave this team?</p>
        </Modal>
        {isOwner && (
          <>
            <Button
              style={{ margin: '1em', borderRadius: '4px' }}
              onClick={() => setVisibleDeleteModal(true)}
            >
              <DeleteOutlined />
              Delete Team
            </Button>
            <Modal
              visible={visibleDeleteModal}
              onOk={() => {
                setVisibleDeleteModal(false);
                setActiveTeam({ id: '' });
                deleteTeam(team.id);
                router.push('/');
              }}
              onCancel={() => setVisibleDeleteModal(false)}
            >
              <p>Are you sure you want to permanently delete this team?</p>
            </Modal>
          </>
        )}
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
  deleteTeam: func,
  removeUser: func,
  setActiveTeam: func,
};
const ConnectedTeam = connect(mapStateToProps, mapDispatchToProps)(Team);
export default page(ConnectedTeam);
