import React, { useState } from 'react';
import { array, bool, func, string } from 'prop-types';
import styles from '../team.module.css';
import Team__Modal from '../__Modal/team__modal';

export const Team__ArrayField = ({
  isOwner = false,
  members = [],
  listName = '',
  teamId = '',
  user = '',
  addUsers,
  removeUser,
} = {}) => {
  const [visible, setVisible] = useState(false);
  const handleRemoveMember = (member) => {
    if (members.length === 1) {
      alert('cannot remove member, a team must have at least a member');
      return;
    }
    if (member === user) {
      removeUser({ teamId, userId: member, listName });
      return;
    }

    if (!isOwner) return;

    removeUser({ teamId, userId: member, listName });
  };

  const handleAddUser = () => {
    setVisible(true);
  };
  return (
    <div className={styles.team__arrayField}>
      <div className={styles.team__label}>
        <h2>{listName}: </h2>
      </div>
      <div className={styles.team__values}>
        {members.map((member) => (
          <div key={member}>
            {member}
            <button onClick={() => handleRemoveMember(member)}>x</button>
          </div>
        ))}
        {isOwner && (
          <div>
            <button onClick={handleAddUser}>+ Add user</button>
            <Team__Modal
              visible={visible}
              setVisible={setVisible}
              listName={listName}
              addUsers={addUsers}
              teamId={teamId}
            />
          </div>
        )}
      </div>
    </div>
  );
};

Team__ArrayField.propTypes = {
  members: array,
  isOwner: bool,
  listName: string,
  teamId: string,
  user: string,
  addUsers: func,
  removeUser: func,
};

export default Team__ArrayField;
