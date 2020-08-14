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
  {
    title: 'Finish',
  },
];

const CheckinContent = ({
  yesterdayTasks = [],
  yesterdayBlockers = [],
  todayTasks = [],
  todayBlockers = [],
  doingWell = '',
  needsImprovements = '',
  addYesterdayTasks = noop,
  addYesterdayBlockers = noop,
  addTodayTasks = noop,
  addTodayBlockers = noop,
  deleteYesterdayTasks = noop,
  deleteYesterdayBlockers = noop,
  deleteTodayTasks = noop,
  deleteTodayBlockers = noop,
  submitForm = noop,
  latestCheckin = {},
} = {}) => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent((current) => current + 1);
  };

  const prev = () => {
    setCurrent((current) => current - 1);
  };

  let addTasks;
  let addBlockers;
  let deleteTasks;
  let deleteBlockers;
  let tasks;
  let blockers;
  if (current === 0) {
    addTasks = addYesterdayTasks;
    addBlockers = addYesterdayBlockers;
    deleteTasks = deleteYesterdayTasks;
    deleteBlockers = deleteYesterdayBlockers;
    tasks = yesterdayTasks;
    blockers = yesterdayBlockers;
  }
  if (current === 1) {
    addTasks = addTodayTasks;
    addBlockers = addTodayBlockers;
    deleteTasks = deleteTodayTasks;
    deleteBlockers = deleteTodayBlockers;
    tasks = todayTasks;
    blockers = todayBlockers;
  }

  console.log(latestCheckin);
  return (
    <div className={styles.stepsContainer}>
      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <StepsContent
        current={current}
        tasks={tasks}
        blockers={blockers}
        addTasks={addTasks}
        addBlockers={addBlockers}
        deleteTasks={deleteTasks}
        deleteBlockers={deleteBlockers}
      />
      <StepsActions
        current={current}
        next={next}
        prev={prev}
        submitForm={() =>
          submitForm({
            yesterdayTasks,
            yesterdayBlockers,
            todayTasks,
            todayBlockers,
            doingWell,
            needsImprovements,
          })
        }
        steps={steps}
      />
    </div>
  );
};

CheckinContent.propTypes = {
  yesterdayTasks: PropTypes.array,
  yesterdayBlockers: PropTypes.array,
  todayTasks: PropTypes.array,
  todayBlockers: PropTypes.array,
  doingWell: PropTypes.string,
  needsImprovements: PropTypes.string,
  addYesterdayTasks: PropTypes.func,
  addYesterdayBlockers: PropTypes.func,
  addTodayTasks: PropTypes.func,
  addTodayBlockers: PropTypes.func,
  deleteYesterdayTasks: PropTypes.func,
  deleteYesterdayBlockers: PropTypes.func,
  deleteTodayTasks: PropTypes.func,
  deleteTodayBlockers: PropTypes.func,
  submitForm: PropTypes.func,
};
export default CheckinContent;
