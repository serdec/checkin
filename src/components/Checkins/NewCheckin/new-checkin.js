import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import withUser from '../../../lib/magic/with-user';
import PropTypes from 'prop-types';
import { initNewCheckin } from './actions-selectors';
import { addItem, deleteItem, toggleItem } from '../../CheckboxForm/reducer';
import { setFeedback } from '../../Feedback/reducer';
import {
  getSaveStatus,
  saveCheckin,
  saveCheckinSimulateError,
} from '../Collection/save-checkin-states-reducer';
import Retry from '../../Retry/retry';
import Loading from '../../Loading/loading';
import StepsContainer from '../../Steps/steps-container';

const noop = () => {
  return;
};

const mapDispatchToProps = {
  addItem,
  deleteItem,
  toggleItem,
  setFeedback,
  saveCheckin,
  saveCheckinSimulateError,
};

const mapStateToProps = (state) => ({
  checkin: initNewCheckin(state),
  saveStatus: getSaveStatus(state),
});

export const NewCheckin = ({
  checkin = {},
  saveStatus = {},
  simulateNetServError = false,
  user = {},
  onDone = noop,
  ...dispatchActions
} = {}) => {
  const [retry, setRetry] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saveCheckin, setSaveCheckin] = useState(() => saveCheckin);

  useEffect(() => {
    saveStatus.status === 'error' ? setRetry(true) : setRetry(false);
    saveStatus.status === 'savingCheckin'
      ? setLoading(true)
      : setLoading(false);
  }, [saveStatus]);

  useEffect(() => {
    simulateNetServError
      ? setSaveCheckin(() => dispatchActions.saveCheckinSimulateError)
      : setSaveCheckin(() => dispatchActions.saveCheckin);
  }, [
    simulateNetServError,
    dispatchActions.saveCheckin,
    dispatchActions.saveCheckinSimulateError,
  ]);

  const handleRetry = () => {
    saveCheckin(saveStatus.payload);
    onDone();
  };

  const handleCheckinSubmission = () => {
    saveCheckin({
      ...checkin,
      user: user.email,
    });
    onDone();
  };

  return (
    <div>
      {loading && <Loading />}
      {!loading && retry && <Retry retryAction={handleRetry} />}
      {!loading && !retry && (
        <StepsContainer
          checkin={checkin}
          user={user}
          checkinActions={{
            ...dispatchActions,
            save: handleCheckinSubmission,
          }}
        />
      )}
    </div>
  );
};

NewCheckin.propTypes = {
  checkin: PropTypes.object,
  saveStatus: PropTypes.object,
  simulateNetServError: PropTypes.bool,
  user: PropTypes.object,
  addItem: PropTypes.func,
  deleteItem: PropTypes.func,
  toggleItem: PropTypes.func,
  retryAction: PropTypes.func,
  setFeedback: PropTypes.func,
  saveCheckin: PropTypes.func,
  saveCheckinSimulateError: PropTypes.func,
  onDone: PropTypes.func,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withUser(NewCheckin));
