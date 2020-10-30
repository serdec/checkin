import React from 'react';
import PropTypes from 'prop-types';
import InputWithAction from './input-with-action';

const TeamCreationInput = ({ createTeam, onDone, user } = {}) => {
  const handleCreate = (teamName) => {
    createTeam({ name: teamName, owner: user });
  };
  return (
    <div>
      <InputWithAction
        actionName={'Create'}
        onOk={handleCreate}
        onDone={onDone}
        onCancel={onDone}
        placeholder={'Team Name...'}
      />
    </div>
  );
};

TeamCreationInput.propTypes = {
  createTeam: PropTypes.func,
  onDone: PropTypes.func,
  user: PropTypes.string,
};
export default TeamCreationInput;
