import React from 'react';
import PropTypes from 'prop-types';
import StepsContainer from '../../Steps/steps-container';

export const NewCheckin = ({
  checkin = {},
  user = {},
  checkinActions = {},
} = {}) => {
  return (
    <div>
      <StepsContainer
        checkin={checkin}
        user={user}
        checkinActions={checkinActions}
      />
    </div>
  );
};

NewCheckin.propTypes = {
  checkin: PropTypes.object,
  checkinActions: PropTypes.object,
  user: PropTypes.object,
};
export default NewCheckin;
