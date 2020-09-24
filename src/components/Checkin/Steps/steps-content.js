import React from 'react';
import CheckboxCard from './StepsContent/checkbox-card';
import PropTypes from 'prop-types';
import styles from '../checkin-content.module.css';
import CheckboxForm from './StepsContent/CheckboxContent/checkbox-form';
import { Input } from 'antd';
import {
  tasksLists,
  blockersLists,
  feedbacksFields,
  DOING_WELL,
  NEEDS_IMPROVEMENT,
} from '../../../reducers/checkins/dailyCheckin/daily-checkin';
const { TextArea } = Input;

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
          <CheckboxCard title={'Tasks'} img={'tasks.png'}>
            <CheckboxForm
              checkList={tasks[period]}
              onAddClick={addItem(tasksLists[step])}
              onDeleteClick={deleteItem(tasksLists[step])}
            />
          </CheckboxCard>
          <CheckboxCard title={'Blockers'} img={'blockers.png'}>
            <CheckboxForm
              checkList={blockers[period]}
              onAddClick={addItem(blockersLists[step])}
              onDeleteClick={deleteItem(blockersLists[step])}
            />
          </CheckboxCard>
        </div>
      )}
      {step === 2 && (
        <div className={styles.dayView}>
          <CheckboxCard title={'Doing Well'} img={'doingWell.png'}>
            <TextArea
              style={{ padding: '30px 30px' }}
              onChange={(e) => {
                const value = e.target.value;
                setFeedback(feedbacksFields[DOING_WELL])(value);
              }}
              value={feedbacks['doingWell']}
            />
          </CheckboxCard>

          <CheckboxCard title={'Needs Improvement'} img={'improvements.png'}>
            <TextArea
              style={{ padding: '30px 30px' }}
              onChange={(e) => {
                const value = e.target.value;
                setFeedback(feedbacksFields[NEEDS_IMPROVEMENT])(value);
              }}
              value={feedbacks['needsImprovement']}
            />
          </CheckboxCard>
        </div>
      )}
      {step >= 3 && (
        <div className={styles.dayView}>
          <CheckboxCard title={'Done'} img={'done.png'}></CheckboxCard>
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
