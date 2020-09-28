import React from 'react';
import Card from '../Card/card';
import PropTypes from 'prop-types';
import styles from '../Checkins/CurrentCheckin/current-checkin.module.css';
import CheckboxForm from '../CheckboxForm/checkbox-form';
import {
  tasksLists,
  blockersLists,
  feedbacksFields,
  DOING_WELL,
  NEEDS_IMPROVEMENT,
} from '../Checkins/CurrentCheckin/reducer';
import Feedback from '../Feedback/feedback';

const noop = () => {
  return;
};

const StepsContent = ({
  step = 0,
  tasks = {},
  blockers = {},
  feedbacks = {},
  addItem = noop,
  deleteItem = noop,
  setFeedback = noop,
}) => {
  let period = step === 0 ? 'previous' : 'current';
  return (
    <div className={styles.stepsContent}>
      {step < 2 && (
        <div className={styles.dayView}>
          <Card title={'Tasks'} img={'tasks.png'}>
            <CheckboxForm
              checkList={tasks[period]}
              listName={tasksLists[step]}
              onAddClick={addItem}
              onDeleteClick={deleteItem}
            />
          </Card>
          <Card title={'Blockers'} img={'blockers.png'}>
            <CheckboxForm
              checkList={blockers[period]}
              listName={blockersLists[step]}
              onAddClick={addItem}
              onDeleteClick={deleteItem}
            />
          </Card>
        </div>
      )}
      {step === 2 && (
        <div className={styles.dayView}>
          <Card title={'Doing Well'} img={'doingWell.png'}>
            <Feedback
              feedbackName={feedbacksFields[DOING_WELL]}
              setFeedback={setFeedback}
              value={feedbacks['doingWell']}
            />
          </Card>

          <Card title={'Needs Improvement'} img={'improvements.png'}>
            <Feedback
              feedbackName={feedbacksFields[NEEDS_IMPROVEMENT]}
              setFeedback={setFeedback}
              value={feedbacks['needsImprovement']}
            />
          </Card>
        </div>
      )}
      {step >= 3 && (
        <div className={styles.dayView}>
          <Card title={'Done'} img={'done.png'}></Card>
        </div>
      )}
    </div>
  );
};

StepsContent.propTypes = {
  step: PropTypes.number,
  tasks: PropTypes.object,
  blockers: PropTypes.object,
  feedbacks: PropTypes.object,
  addItem: PropTypes.func,
  deleteItem: PropTypes.func,
  setFeedback: PropTypes.func,
};
export default StepsContent;
