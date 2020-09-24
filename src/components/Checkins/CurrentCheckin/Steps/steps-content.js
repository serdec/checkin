import React from 'react';
import Card from '../../../Card/card';
import PropTypes from 'prop-types';
import styles from '../checkin-content.module.css';
import CheckboxForm from '../../../CheckboxForm/checkbox-form';
// TODO delete comment import { Input } from 'antd';
import {
  tasksLists,
  blockersLists,
  feedbacksFields,
  DOING_WELL,
  NEEDS_IMPROVEMENT,
} from '../../CurrentCheckin/reducer';
import Feedback from '../../../Feedback/feedback';
// TODO delete comment const { TextArea } = Input;

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
              onAddClick={addItem(tasksLists[step])}
              onDeleteClick={deleteItem(tasksLists[step])}
            />
          </Card>
          <Card title={'Blockers'} img={'blockers.png'}>
            <CheckboxForm
              checkList={blockers[period]}
              onAddClick={addItem(blockersLists[step])}
              onDeleteClick={deleteItem(blockersLists[step])}
            />
          </Card>
        </div>
      )}
      {step === 2 && (
        <div className={styles.dayView}>
          <Card title={'Doing Well'} img={'doingWell.png'}>
            <Feedback
              setFeedback={setFeedback(feedbacksFields[DOING_WELL])}
              value={feedbacks[DOING_WELL]}
            />
            {/* <TextArea
              style={{ padding: '30px 30px' }}
              onChange={(e) => {
                const value = e.target.value;
                setFeedback(feedbacksFields[DOING_WELL])(value);
              }}
              value={feedbacks['doingWell']}
            /> */}
          </Card>

          <Card title={'Needs Improvement'} img={'improvements.png'}>
            <Feedback
              setFeedback={setFeedback(feedbacksFields[NEEDS_IMPROVEMENT])}
              value={feedbacks[NEEDS_IMPROVEMENT]}
            />
            {/* <TextArea
              style={{ padding: '30px 30px' }}
              onChange={(e) => {
                const value = e.target.value;
                setFeedback(feedbacksFields[NEEDS_IMPROVEMENT])(value);
              }}
              value={feedbacks['needsImprovement']}
            /> */}
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
