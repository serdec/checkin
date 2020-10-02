import React from 'react';
import PropTypes from 'prop-types';
import InputWithAction from './input-with-action';

const TeamCreationInput = ({ createTeam, onDone } = {}) => {
  const handleCreate = (teamName) => {
    createTeam(teamName);
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
};
export default TeamCreationInput;
