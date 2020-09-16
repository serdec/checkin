import React, { useState } from 'react';
import { connect } from 'react-redux';
import withUser from '../../lib/magic/with-user';
import { Steps } from 'antd';
import PropTypes from 'prop-types';
import styles from './checkin-content.module.css';
import StepsContent from './Steps/steps-content';
import StepsActions from './Steps/steps-actions';
import {
  getCurrentCheckin,
  getActiveTeam,
  getTeams,
} from '../../store/root-reducer';
import {
  getTasks,
  getBlockers,
  getFeedbacks,
  clearCurrentCheckin,
} from '../../reducers/checkins/dailyCheckin/daily-checkin';
import { addItem, deleteItem } from '../../reducers/checkins/dailyCheckin/list';
import { setFeedback } from '../../reducers/checkins/dailyCheckin/feedback';
import { getTeamName } from '../Teams/team-reducer';
import { addCheckin } from '../../reducers/checkins/checkinsCollection/checkins-collection';
import { getDateString } from '../../lib/date/date';
import cuid from 'cuid';

const noop = () => {
  return;
};

//TODO remove state shape dependency
const mapStateToProps = (state) => ({
  tasks: getTasks(getCurrentCheckin(state)),
  blockers: getBlockers(getCurrentCheckin(state)),
  feedbacks: getFeedbacks(getCurrentCheckin(state)),
  teamId: getActiveTeam(state),
  teamName: getTeamName(getTeams(state), getActiveTeam(state)),
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
  addItem: addField(dispatch),
  deleteItem: deleteField(dispatch),
  setFeedback: setFeedbackValue(dispatch),

  submitForm: ({
    id = cuid(),
    date = getDateString(new Date()),
    user = '',
    teamId = '',
    teamName = '',
    tasks = {},
    blockers = {},
    feedbacks = {},
  } = {}) => {
    dispatch(
      addCheckin({
        id,
        date,
        user,
        teamId,
        teamName,
        tasks,
        blockers,
        feedbacks,
      })
    );
    dispatch(clearCurrentCheckin());
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
  tasks = {},
  blockers = {},
  feedbacks = {},
  teamId = '',
  teamName = '',
  user = {},
  addItem = noop,
  deleteItem = noop,
  setFeedback = noop,
  submitForm = noop,
  onDone = noop,
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
  );
};

CheckinContent.propTypes = {
  tasks: PropTypes.object,
  blockers: PropTypes.object,
  feedbacks: PropTypes.object,
  teamId: PropTypes.string,
  teamName: PropTypes.string,
  user: PropTypes.object,
  addItem: PropTypes.func,
  deleteItem: PropTypes.func,
  setFeedback: PropTypes.func,
  submitForm: PropTypes.func,
  onDone: PropTypes.func,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withUser(CheckinContent));
