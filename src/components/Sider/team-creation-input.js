import React from 'react';
import { connect } from 'react-redux';
import withUser from '../../lib/magic/with-user';
import { createTeam } from '../Teams/team-reducer';
import PropTypes from 'prop-types';
import InputWithAction from './input-with-action';

const mapDispatchtoProps = (dispatch) => ({
  createTeam: ({ name, owner }) => dispatch(createTeam({ name, owner })),
});

const TeamCreationInput = ({ user, createTeam, onDone } = {}) => {
  const handleCreate = (teamName) => {
    createTeam({ name: teamName, owner: user.email });
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
  user: PropTypes.object,
  createTeam: PropTypes.func,
};
export default connect(null, mapDispatchtoProps)(withUser(TeamCreationInput));
