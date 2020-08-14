import React, { useState } from 'react';
import { Steps } from 'antd';
import PropTypes from 'prop-types';
import styles from './checkin-content.module.css';
import StepsContent from './Steps/steps-content';
import StepsActions from './Steps/steps-action';

const noop = () => {
  return;
};
const { Step } = Steps;

const steps = [
  {
    title: 'Yesterday',
    content: 'First-content',
  },
  {
    title: 'Today',
    content: 'Second-content',
  },
  {
    title: 'Feedback',
    content: 'Last-content',
  },
];

const CheckinContent = ({
  latestCheckin = {},
  tasks = [],
  blockers = [],
  addInputField = noop,
  onDeleteClick = noop,
  submitForm = noop,
} = {}) => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    const _current = current + 1;
    setCurrent(_current);
  };

  const prev = () => {
    const _current = current - 1;
    setCurrent(_current);
  };

  // let tasksToPass = [
  //   {
  //     id: 1,
  //     value: 'value3',
  //     active: false,
  //   },
  //   {
  //     id: 2,
  //     value: 'value4',
  //     active: false,
  //   },
  // ];

  // if (current === 0) {
  //   tasksToPass = [
  //     {
  //       id: 1,
  //       value: 'value1',
  //       active: false,
  //     },
  //     {
  //       id: 2,
  //       value: 'value2',
  //       active: true,
  //     },
  //   ];
  // }

  // if (current === 0) {
  //   tasks = latestCheckin.todayTasks;
  //   blockers = latestCheckin.todayBlockers;
  // }

  return (
    <div className={styles.stepsContainer}>
      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <StepsContent
        tasks={tasks}
        blockers={blockers}
        addInputField={addInputField}
        onDeleteClick={onDeleteClick}
      />
      <StepsActions
        current={current}
        next={next}
        prev={prev}
        submitForm={submitForm}
        steps={steps}
      />
    </div>
  );
};

CheckinContent.propTypes = {
  latestCheckin: PropTypes.object,
  tasks: PropTypes.array,
  blockers: PropTypes.array,
  addInputField: PropTypes.func,
  onDeleteClick: PropTypes.func,
  submitForm: PropTypes.func,
};
export default CheckinContent;
