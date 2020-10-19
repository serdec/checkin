import React, { useState } from 'react';
import { Steps } from 'antd';
import StepsContent from './steps-content';
import StepsActions from './steps-actions';

import PropTypes from 'prop-types';
import styles from './steps.module.css';

const noop = () => { };
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

const StepsContainer = ({
  blockers = {},
  feedbacks = {},
  tasks = {},
  teamId = '',
  teamName = '',
  user = {},
  addItem = noop,
  deleteItem = noop,
  onDone = noop,
  setFeedback = noop,
  submitForm = noop,
  toggleItem = noop,
} = {}) => {
  const [step, setStep] = useState(0);

  const next = () => {
    setStep((step) => step + 1);
  };

  const prev = () => {
    setStep((step) => step - 1);
  };

  return (
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
        toggleItem={toggleItem}
        deleteItem={deleteItem}
        setFeedback={setFeedback}
      />
      <StepsActions
        step={step}
        next={next}
        prev={prev}
        submitForm={() => {
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
        }}
        steps={steps}
      />
    </div>
  );
};

StepsContainer.propTypes = {
  blockers: PropTypes.object,
  feedbacks: PropTypes.object,
  tasks: PropTypes.object,
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
  submitForm: PropTypes.func,
  saveCheckin: PropTypes.func,
  saveCheckinSimulateError: PropTypes.func,
  onDone: PropTypes.func,
};
export default StepsContainer;
