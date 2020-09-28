import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import withUser from '../../../lib/magic/with-user';
import { Steps } from 'antd';
import PropTypes from 'prop-types';
import styles from './current-checkin.module.css';
import StepsContent from '../../Steps/steps-content';
import StepsActions from '../../Steps/steps-actions';
import {
  getCurrentCheckin,
  getActiveTeam,
  getTeams,
  getCheckins,
} from '../../../store/root-reducer';
import { getTasks, getBlockers, getFeedbacks } from './reducer';
import { addItem, deleteItem } from '../../CheckboxForm/reducer';
import { setFeedback } from '../../Feedback/reducer';
import { getTeamName } from '../../Teams/reducer';
import {
  saveCheckin,
  saveCheckinSimulateError,
} from '../Collection/save-checkin-states-reducer';
import { getSaveStatus } from '../Collection/reducer';
import Retry from '../../Retry/retry';
import Loading from '../Loading/loading';

const noop = () => {
  return;
};

const mapDispatchToProps = {
  addItem,
  deleteItem,
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

const { Step } = Steps;

const steps = [
  {
    title: 'Previous',
    content: 'First-content',
  },
  {
    title: 'Current',
    content: 'Second-content',
  },
  {
    title: 'Feedback',
    content: 'Last-content',
  },
  {
    title: 'Finish',
  },
];

const CheckinContent = ({
  tasks = {},
  blockers = {},
  feedbacks = {},
  saveStatus = {},
  simulateNetServError = false,
  teamId = '',
  teamName = '',
  user = {},
  addItem = noop,
  deleteItem = noop,
  setFeedback = noop,
  saveCheckin = noop,
  saveCheckinSimulateError = noop,
  onDone = noop,
} = {}) => {
  const [step, setStep] = useState(0);
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

  const next = () => {
    setStep((step) => step + 1);
  };

  const prev = () => {
    setStep((step) => step - 1);
  };

  return (
    <div>
      {loading && <Loading />}
      {!loading && retry && <Retry retryAction={handleRetry} />}
      {!loading && !retry && (
        <div className={styles.stepsContainer}>
          <Steps current={step}>
            {steps.map((item) => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <StepsContent
            step={step}
            tasks={tasks}
            blockers={blockers}
            feedbacks={feedbacks}
            addItem={addItem}
            deleteItem={deleteItem}
            setFeedback={setFeedback}
          />
          <StepsActions
            step={step}
            next={next}
            prev={prev}
            submitForm={() => {
              submitForm({
                tasks,
                blockers,
                feedbacks,
                teamId,
                teamName,
                user: user.email,
              });
              onDone();
            }}
            steps={steps}
          />
        </div>
      )}
    </div>
  );
};

CheckinContent.propTypes = {
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
  retryAction: PropTypes.func,
  setFeedback: PropTypes.func,
  saveCheckin: PropTypes.func,
  saveCheckinSimulateError: PropTypes.func,
  onDone: PropTypes.func,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withUser(CheckinContent));
