import React, { useState } from 'react';
import { connect } from 'react-redux';
import withUser from '../../../lib/magic/with-user';
import { Steps } from 'antd';
import PropTypes from 'prop-types';
import styles from './checkin-content.module.css';
import StepsContent from '../../Steps/steps-content';
import StepsActions from '../../Steps/steps-actions';
import {
  getCurrentCheckin,
  getActiveTeam,
  getTeams,
} from '../../../store/root-reducer';
import { getTasks, getBlockers, getFeedbacks } from './reducer';
import { addItem, deleteItem } from '../../CheckboxForm/reducer';
import { setFeedback } from '../../Feedback/reducer';
import { getTeamName } from '../../Teams/reducer';
import { addCheckin } from '../Collection/reducer';

const noop = () => {
  return;
};

const addField = (dispatch) => (listName) => (value) => {
  dispatch(addItem(listName)({ value }));
};
const deleteField = (dispatch) => (listName) => (id) => {
  dispatch(deleteItem(listName)(id));
};
const setFeedbackValue = (dispatch) => (feedbackName) => (value) => {
  dispatch(setFeedback(feedbackName)(value));
};
const submitForm = (dispatch) => (obj) => {
  dispatch(addCheckin(obj));
};
const mapDispatchToProps = (dispatch) => ({
  addItem: addField(dispatch),
  deleteItem: deleteField(dispatch),
  setFeedback: setFeedbackValue(dispatch),
  submitForm: submitForm(dispatch),
});

const mapStateToProps = (state) => ({
  tasks: getTasks(getCurrentCheckin(state)),
  blockers: getBlockers(getCurrentCheckin(state)),
  feedbacks: getFeedbacks(getCurrentCheckin(state)),
  teamId: getActiveTeam(state),
  teamName: getTeamName(getTeams(state), getActiveTeam(state)),
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
