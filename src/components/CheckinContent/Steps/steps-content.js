import React from 'react';
import CheckboxCard from './StepsContent/checkbox-card';
import PropTypes from 'prop-types';
import styles from '../checkin-content.module.css';
import CheckboxForm from './StepsContent/CheckboxContent/checkbox-form';
import { Input } from 'antd';

const { TextArea } = Input;

const noop = () => {
  return;
};

const StepsContent = ({
  current = 0,
  tasks = [],
  blockers = [],
  doingWellFeedback = '',
  setDoingWellFeedback = noop,
  needsImprovementFeedback = '',
  setNeedsImprovementFeedback = noop,
  addTasks = noop,
  addBlockers = noop,
  deleteTasks = noop,
  deleteBlockers = noop,
}) => {
  return (
    <div className={styles.stepsContent}>
      {current < 2 && (
        <div className={styles.dayView}>
          <CheckboxCard title={'Tasks'} img={'tasks.png'}>
            <CheckboxForm
              checkList={tasks}
              onAddClick={addTasks}
              onDeleteClick={deleteTasks}
            />
          </CheckboxCard>
          <CheckboxCard title={'Blockers'} img={'blockers.png'}>
            <CheckboxForm
              checkList={blockers}
              onAddClick={addBlockers}
              onDeleteClick={deleteBlockers}
            />
          </CheckboxCard>
        </div>
      )}
      {current === 2 && (
        <div className={styles.dayView}>
          <CheckboxCard title={'Doing Well'} img={'doingWell.png'}>
            <TextArea
              style={{ padding: '30px 30px' }}
              onChange={(e) => {
                const value = e.target.value;
                setDoingWellFeedback(value);
              }}
              value={doingWellFeedback}
            />
          </CheckboxCard>

          <CheckboxCard title={'Needs Improvement'} img={'improvements.png'}>
            <TextArea
              style={{ padding: '30px 30px' }}
              onChange={(e) => {
                const value = e.target.value;
                setNeedsImprovementFeedback(value);
              }}
              value={needsImprovementFeedback}
            />
          </CheckboxCard>
        </div>
      )}
      {current >= 3 && (
        <div className={styles.dayView}>
          <CheckboxCard title={'Done'} img={'done.png'}></CheckboxCard>
        </div>
      )}
    </div>
  );
};

StepsContent.propTypes = {
  current: PropTypes.number,
  tasks: PropTypes.array,
  blockers: PropTypes.array,
  addTasks: PropTypes.func,
  addBlockers: PropTypes.func,
  deleteTasks: PropTypes.func,
  deleteBlockers: PropTypes.func,
  doingWellFeedback: PropTypes.string,
  setDoingWellFeedback: PropTypes.func,
  needsImprovementFeedback: PropTypes.string,
  setNeedsImprovementFeedback: PropTypes.func,
};
export default StepsContent;
