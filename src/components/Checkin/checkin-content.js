import React, { useState } from 'react';
import { connect } from 'react-redux';
import withUser from '../../lib/magic/with-user';
import { Steps } from 'antd';
import PropTypes from 'prop-types';
import styles from './checkin-content.module.css';
import StepsContent from './Steps/steps-content';
import StepsActions from './Steps/steps-actions';
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
  yesterdayTasks: getItems(state.current.yesterdayTasks),
  yesterdayBlockers: getItems(state.current.yesterdayBlockers),
  todayTasks: getItems(state.current.todayTasks),
  todayBlockers: getItems(state.current.todayBlockers),
  doingWellFeedback: getFeedback(state.current.doingWellFeedback),
  needsImprovementFeedback: getFeedback(state.current.needsImprovementFeedback),
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
  addYesterdayTasks: addField(dispatch)('yesterdayTasks'),
  addYesterdayBlockers: addField(dispatch)('yesterdayBlockers'),
  addTodayTasks: addField(dispatch)('todayTasks'),
  addTodayBlockers: addField(dispatch)('todayBlockers'),
  setDoingWellFeedback: setFeedbackValue(dispatch)('doingWellFeedback'),
  setNeedsImprovementFeedback: setFeedbackValue(dispatch)(
    'needsImprovementFeedback'
  ),
  deleteYesterdayTasks: deleteField(dispatch)('yesterdayTasks'),
  deleteYesterdayBlockers: deleteField(dispatch)('yesterdayBlockers'),
  deleteTodayTasks: deleteField(dispatch)('todayTasks'),
  deleteTodayBlockers: deleteField(dispatch)('todayBlockers'),

  submitForm: ({
    id = cuid(),
    date = getDateString(new Date()),
    user = '',
    teamId = '',
    teamName = '',
    yesterdayTasks = [],
    yesterdayBlockers = [],
    todayTasks = [],
    todayBlockers = [],
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
        yesterdayTasks,
        yesterdayBlockers,
        todayTasks,
        todayBlockers,
        doingWellFeedback,
        needsImprovementFeedback,
      })
    );
  },
});

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
  doingWellFeedback = '',
  needsImprovementFeedback = '',
  teamId = '',
  teamName = '',
  user = {},
  addYesterdayTasks = noop,
  addYesterdayBlockers = noop,
  addTodayTasks = noop,
  addTodayBlockers = noop,
  setDoingWellFeedback = noop,
  setNeedsImprovementFeedback = noop,
  deleteYesterdayTasks = noop,
  deleteYesterdayBlockers = noop,
  deleteTodayTasks = noop,
  deleteTodayBlockers = noop,
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
            yesterdayTasks,
            yesterdayBlockers,
            todayTasks,
            todayBlockers,
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
  yesterdayTasks: PropTypes.array,
  yesterdayBlockers: PropTypes.array,
  todayTasks: PropTypes.array,
  todayBlockers: PropTypes.array,
  doingWellFeedback: PropTypes.string,
  teamId: PropTypes.string,
  teamName: PropTypes.string,
  user: PropTypes.object,
  setDoingWellFeedback: PropTypes.func,
  needsImprovementFeedback: PropTypes.string,
  setNeedsImprovementFeedback: PropTypes.func,
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withUser(CheckinContent));
