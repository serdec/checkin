import React, { useState } from 'react';
import { Steps } from 'antd';
import StepsContent from './steps-content';
import StepsActions from './steps-actions';

import PropTypes from 'prop-types';
import styles from './steps.module.css';

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

const StepsContainer = ({ checkin = {}, checkinActions = {} } = {}) => {
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
        checkin={checkin}
        checkinActions={checkinActions}
      />
      <StepsActions
        step={step}
        next={next}
        prev={prev}
        action={checkinActions.saveCheckin}
        steps={steps}
      />
    </div>
  );
};

StepsContainer.propTypes = {
  checkin: PropTypes.object,
  checkinActions: PropTypes.object,
};
export default StepsContainer;
