import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import withUser from '../../../lib/magic/with-user';
import PropTypes from 'prop-types';
import { getBlockers, getFeedbacks, getTasks } from './actions-selectors';
import { addItem, deleteItem, toggleItem } from '../../CheckboxForm/reducer';
import { setFeedback } from '../../Feedback/reducer';
import { getTeamName, getTeams } from '../../Teams/reducer';
import {
  getSaveStatus,
  saveCheckin,
  saveCheckinSimulateError,
} from '../Collection/save-checkin-states-reducer';
import Retry from '../../Retry/retry';
import Loading from '../../Loading/loading';
import StepsContainer from '../../Steps/steps-container';
import { getActiveTeam } from '../../ActiveTeam/reducer';

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
  tasks: getTasks(state),
  blockers: getBlockers(state),
  feedbacks: getFeedbacks(state),
  teamId: getActiveTeam(state),
  teamName: getTeamName(getTeams(state), getActiveTeam(state)),
  saveStatus: getSaveStatus(state),
});

export const NewCheckin = ({
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
    saveStatus.status === 'savingCheckin'
      ? setLoading(true)
      : setLoading(false);
  }, [saveStatus]);

  useEffect(() => {
    simulateNetServError
      ? setSubmitForm(() => saveCheckinSimulateError)
      : setSubmitForm(() => saveCheckin);
  }, [simulateNetServError, saveCheckin, saveCheckinSimulateError]);

  const handleRetry = () => {
    submitForm(saveStatus.payload);
    onDone();
  };

  const handleCheckinFormSubmission = () => {
    submitForm({
      previousTasks: tasks.previous,
      currentTasks: tasks.current,
      previousBlockers: blockers.previous,
      currentBlockers: blockers.current,
      doingWellFeedback: feedbacks.doingWell,
      needsImprovementFeedback: feedbacks.needsImprovement,
      teamId,
      teamName,
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
          submitForm={handleCheckinFormSubmission}
          toggleItem={toggleItem}
        />
      )}
    </div>
  );
};

NewCheckin.propTypes = {
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
)(withUser(NewCheckin));
