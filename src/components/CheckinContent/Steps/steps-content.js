import React from 'react';
import CheckboxCard from './StepsContent/checkbox-card';
import PropTypes from 'prop-types';
import styles from '../checkin-content.module.css';

const noop = () => {
  return;
};

const StepsContent = ({
  current = 0,
  tasks = [],
  blockers = [],
  addTasks = noop,
  addBlockers = noop,
  deleteTasks = noop,
  deleteBlockers = noop,
}) => {
  return (
    <div className={styles.stepsContent}>
      {current < 2 && (
        <div className={styles.dayView}>
          <CheckboxCard
            title={'Tasks'}
            img={'tasks.png'}
            checkList={tasks}
            onAddClick={addTasks}
            onDeleteClick={deleteTasks}
          />
          <CheckboxCard
            title={'Blockers'}
            img={'blockers.png'}
            checkList={blockers}
            onAddClick={addBlockers}
            onDeleteClick={deleteBlockers}
          />
        </div>
      )}
      {current === 2 && (
        <div className={styles.dayView}>
          <CheckboxCard
            title={'Doing Well'}
            img={'doingWell.png'}
            checkList={tasks}
            onAddClick={addTasks}
            onDeleteClick={deleteTasks}
          />
          <CheckboxCard
            title={'Needs Improvement'}
            img={'improvements.png'}
            checkList={blockers}
            onAddClick={addBlockers}
            onDeleteClick={deleteBlockers}
          />
        </div>
      )}
      {current >= 3 && (
        <div className={styles.dayView}>
          <CheckboxCard
            title={'Done'}
            img={'done.png'}
            checkList={[]}
            onAddClick={addTasks}
            onDeleteClick={deleteTasks}
          />
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
};
export default StepsContent;
