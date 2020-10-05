import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import withUser from '../../../lib/magic/with-user';
import PropTypes from 'prop-types';
import {
  getCurrentCheckin,
  getActiveTeam,
  getTeams,
  getCheckins,
} from '../../../store/root-reducer';
import { getBlockers, getFeedbacks, getTasks } from './reducer';
import { addItem, deleteItem, toggleItem } from '../../CheckboxForm/reducer';
import { setFeedback } from '../../Feedback/reducer';
import { getTeamName } from '../../Teams/reducer';
import {
  saveCheckin,
  saveCheckinSimulateError,
} from '../Collection/save-checkin-states-reducer';
import { getSaveStatus } from '../Collection/reducer';
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
  tasks: getTasks(getCurrentCheckin(state)),
  blockers: getBlockers(getCurrentCheckin(state)),
  feedbacks: getFeedbacks(getCurrentCheckin(state)),
  teamId: getActiveTeam(state),
  teamName: getTeamName(getTeams(state), getActiveTeam(state)),
  saveStatus: getSaveStatus(getCheckins(state)),
});

export const CurrentCheckin = ({
  blockers = {},
  feedbacks = {},
  tasks = {},
  saveStatus = {},
  simulateNetServError = false,
  teamName = '',
  teamId = '',
  user = {},
  addItem = noop,
  deleteItem = noop,
  toggleItem = noop,
  setFeedback = noop,
  saveCheckin = noop,
  saveCheckinSimulateError = noop,
  onDone = noop,
} = {}) => {
  const [retry, setRetry] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitForm, setSubmitForm] = useState(() => saveCheckin);

  useEffect(() => {
    saveStatus.status === 'error' ? setRetry(true) : setRetry(false);
    simulateNetServError
      ? setSubmitForm(() => saveCheckinSimulateError)
      : setSubmitForm(() => saveCheckin);
    saveStatus.status === 'savingCheckin'
      ? setLoading(true)
      : setLoading(false);
  }, [
    retry,
    saveStatus,
    simulateNetServError,
    saveCheckin,
    saveCheckinSimulateError,
  ]);

  const handleRetry = () => {
    submitForm(saveStatus.payload);
    onDone();
  };

  return (
    <div>
      {loading && <Loading />}
      {!loading && retry && <Retry retryAction={handleRetry} />}
      {!loading && !retry && (
        <StepsContainer
          blockers={blockers}
          feedbacks={feedbacks}
          tasks={tasks}
          teamId={teamId}
          teamName={teamName}
          user={user}
          addItem={addItem}
          deleteItem={deleteItem}
          onDone={onDone}
          setFeedback={setFeedback}
          submitForm={submitForm}
          toggleItem={toggleItem}
        />
      )}
    </div>
  );
};

CurrentCheckin.propTypes = {
  tasks: PropTypes.object,
  blockers: PropTypes.object,
  feedbacks: PropTypes.object,
  saveStatus: PropTypes.object,
  simulateNetServError: PropTypes.bool,
  teamId: PropTypes.string,
  teamName: PropTypes.string,
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
)(withUser(CurrentCheckin));
