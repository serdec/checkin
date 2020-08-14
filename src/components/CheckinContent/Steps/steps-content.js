import React from 'react';
import CheckboxCard from './StepsContent/checkbox-card';
import PropTypes from 'prop-types';
import styles from '../checkin-content.module.css';

const noop = () => {
  return;
};

const StepsContent = ({
  tasks = [],
  blockers = [],
  addInputField = noop,
  onDeleteClick = noop,
}) => {
  return (
    <div className={styles.stepsContent}>
      <div className={styles.dayView}>
        <CheckboxCard
          title={'Tasks'}
          img={'tasks.png'}
          checkList={tasks}
          onAddClick={addInputField}
          onDeleteClick={onDeleteClick}
        />
        <CheckboxCard
          title={'Blockers'}
          img={'blockers.png'}
          checkList={blockers}
          onAddClick={addInputField}
          onDeleteClick={onDeleteClick}
        />
      </div>
    </div>
  );
};

StepsContent.propTypes = {
  tasks: PropTypes.array,
  blockers: PropTypes.array,
  addInputField: PropTypes.func,
  onDeleteClick: PropTypes.func,
};
export default StepsContent;
