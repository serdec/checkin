import React, { useState } from 'react';
import { connect } from 'react-redux';
import withUser from '../../lib/magic/with-user';
import { Steps } from 'antd';
import PropTypes from 'prop-types';
import styles from './checkin-content.module.css';
import StepsContent from './Steps/steps-content';
import StepsActions from './Steps/steps-actions';
import {
  tasks,
  blockers,
  feedbacks,
} from '../../reducers/checkins/dailyCheckin/daily-checkin';
import {
  getItems,
  addItem,
  deleteItem,
} from '../../reducers/checkins/dailyCheckin/list';
import {
  setFeedback,
  getFeedback,
} from '../../reducers/checkins/dailyCheckin/feedback';
import { getTeamName } from '../Teams/team-reducer';
import { addCheckin } from '../../reducers/checkins/checkinsCollection/checkins-collection';
import { getDateString } from '../../lib/date/date';
import cuid from 'cuid';

const noop = () => {
  return;
};

//TODO remove state shape dependency
const mapStateToProps = (state) => ({
  previousTasks: getItems(state.current[tasks[0]]),
  previousBlockers: getItems(state.current[blockers[0]]),
  currentTasks: getItems(state.current[tasks[1]]),
  currentBlockers: getItems(state.current[blockers[1]]),
  doingWellFeedback: getFeedback(state.current[feedbacks[0]]),
  needsImprovementFeedback: getFeedback(state.current[feedbacks[1]]),
  teamId: state.activeTeam,
  teamName: getTeamName({ state: state.teams, teamId: state.activeTeam }),
});

const addField = (dispatch) => (listName) => (value) => {
  if (value === '') {
    return;
  }
  dispatch(addItem(listName)({ value }));
};
const deleteField = (dispatch) => (listName) => (id) => {
  dispatch(deleteItem(listName)(id));
};
const setFeedbackValue = (dispatch) => (feedbackName) => (value) => {
  dispatch(setFeedback(feedbackName)(value));
};
const mapDispatchToProps = (dispatch) => ({
  addPreviousTasks: addField(dispatch)(tasks[0]),
  addPreviousBlockers: addField(dispatch)(blockers[0]),
  addCurrentTasks: addField(dispatch)(tasks[1]),
  addCurrentBlockers: addField(dispatch)(blockers[1]),
  setDoingWellFeedback: setFeedbackValue(dispatch)(feedbacks[0]),
  setNeedsImprovementFeedback: setFeedbackValue(dispatch)(feedbacks[1]),
  deletePreviousTasks: deleteField(dispatch)(tasks[0]),
  deletePreviousBlockers: deleteField(dispatch)(blockers[0]),
  deleteCurrentTasks: deleteField(dispatch)(tasks[1]),
  deleteCurrentBlockers: deleteField(dispatch)(blockers[1]),

  submitForm: ({
    id = cuid(),
    date = getDateString(new Date()),
    user = '',
    teamId = '',
    teamName = '',
    previousTasks = [],
    previousBlockers = [],
    currentTasks = [],
    currentBlockers = [],
    doingWellFeedback = '',
    needsImprovementFeedback = '',
  } = {}) => {
    dispatch(
      addCheckin({
        id,
        date,
        user,
        teamId,
        teamName,
        previousTasks,
        previousBlockers,
        currentTasks,
        currentBlockers,
        doingWellFeedback,
        needsImprovementFeedback,
      })
    );
  },
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
  previousTasks = [],
  previousBlockers = [],
  currentTasks = [],
  currentBlockers = [],
  doingWellFeedback = '',
  needsImprovementFeedback = '',
  teamId = '',
  teamName = '',
  user = {},
  addPreviousTasks = noop,
  addPreviousBlockers = noop,
  addCurrentTasks = noop,
  addCurrentBlockers = noop,
  setDoingWellFeedback = noop,
  setNeedsImprovementFeedback = noop,
  deletePreviousTasks = noop,
  deletePreviousBlockers = noop,
  deleteCurrentTasks = noop,
  deleteCurrentBlockers = noop,
  submitForm = noop,
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
    addTasks = addPreviousTasks;
    addBlockers = addPreviousBlockers;
    deleteTasks = deletePreviousTasks;
    deleteBlockers = deletePreviousBlockers;
    tasks = previousTasks;
    blockers = previousBlockers;
  }
  if (current === 1) {
    addTasks = addCurrentTasks;
    addBlockers = addCurrentBlockers;
    deleteTasks = deleteCurrentTasks;
    deleteBlockers = deleteCurrentBlockers;
    tasks = currentTasks;
    blockers = currentBlockers;
  }

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
        doingWellFeedback={doingWellFeedback}
        setDoingWellFeedback={setDoingWellFeedback}
        needsImprovementFeedback={needsImprovementFeedback}
        setNeedsImprovementFeedback={setNeedsImprovementFeedback}
        deleteTasks={deleteTasks}
        deleteBlockers={deleteBlockers}
      />
      <StepsActions
        current={current}
        next={next}
        prev={prev}
        submitForm={() =>
          submitForm({
            previousTasks,
            previousBlockers,
            currentTasks,
            currentBlockers,
            doingWellFeedback,
            needsImprovementFeedback,
            teamId,
            teamName,
            user: user.email,
          })
        }
        steps={steps}
      />
    </div>
  );
};

CheckinContent.propTypes = {
  previousTasks: PropTypes.array,
  previousBlockers: PropTypes.array,
  currentTasks: PropTypes.array,
  currentBlockers: PropTypes.array,
  doingWellFeedback: PropTypes.string,
  teamId: PropTypes.string,
  teamName: PropTypes.string,
  user: PropTypes.object,
  setDoingWellFeedback: PropTypes.func,
  needsImprovementFeedback: PropTypes.string,
  setNeedsImprovementFeedback: PropTypes.func,
  addPreviousTasks: PropTypes.func,
  addPreviousBlockers: PropTypes.func,
  addCurrentTasks: PropTypes.func,
  addCurrentBlockers: PropTypes.func,
  deletePreviousTasks: PropTypes.func,
  deletePreviousBlockers: PropTypes.func,
  deleteCurrentTasks: PropTypes.func,
  deleteCurrentBlockers: PropTypes.func,
  submitForm: PropTypes.func,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withUser(CheckinContent));
