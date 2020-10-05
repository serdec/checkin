import React from 'react';
import Card from '../Cards/card';
import PropTypes from 'prop-types';
import styles from './steps.module.css';
import CheckboxForm from '../CheckboxForm/checkbox-form';
import {
  tasksLists,
  blockersLists,
  feedbacksFields,
  DOING_WELL,
  NEEDS_IMPROVEMENT,
} from '../Checkins/CurrentCheckin/reducer';
import Feedback from '../Feedback/feedback';
import ListSummaryCard from '../Cards/SummaryCards/list-summary-card';

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
  toggleItem = noop,
  setFeedback = noop,
}) => {
  const previousCards = [
    {
      title: 'Previous Tasks',
      img: 'tasks.png',
      content: tasks.previous,
    },
    {
      title: 'Previous Blockers',
      img: 'blockers.png',
      content: blockers.previous,
    },
  ];
  const currentCards = [
    {
      title: 'Tasks',
      img: 'tasks.png',
      content: tasks.current,
      listName: tasksLists[step],
    },
    {
      title: 'Blockers',
      img: 'blockers.png',
      content: blockers.current,
      listName: blockersLists[step],
    },
  ];
  const feedbacksCards = [
    {
      title: 'Doing Well',
      img: 'doingWell.png',
      feedbackName: feedbacksFields[DOING_WELL],
      content: feedbacks.doingWell,
    },
    {
      title: 'Needs Improvement',
      img: 'improvements.png',
      feedbackName: feedbacksFields[NEEDS_IMPROVEMENT],
      content: feedbacks.needsImprovement,
    },
  ];
  const doneCards = [
    {
      title: 'Done',
      img: 'done.png',
    },
  ];
  return (
    <div className={styles.stepsContent}>
      {step === 0 && (
        <div className={styles.stepsContent__dayView}>
          {previousCards.map((list) => (
            <ListSummaryCard
              key={list.title}
              img={list.img}
              size={'large'}
              list={list.content}
              title={list.title}
            />
          ))}
        </div>
      )}
      {step === 1 && (
        <div className={styles.stepsContent__dayView}>
          {currentCards.map((list) => (
            <Card key={list.title} title={list.title} img={list.img}>
              <CheckboxForm
                checkList={list.content}
                listName={list.listName}
                onAddClick={addItem}
                onChange={toggleItem}
                onDeleteClick={deleteItem}
              />
            </Card>
          ))}
        </div>
      )}
      {step === 2 && (
        <div className={styles.stepsContent__dayView}>
          {feedbacksCards.map((feedback) => (
            <Card
              key={feedback.title}
              title={feedback.title}
              img={feedback.img}
            >
              <Feedback
                feedbackName={feedback.feedbackName}
                setFeedback={setFeedback}
                value={feedback.content}
              />
            </Card>
          ))}
        </div>
      )}
      {step >= 3 && (
        <div className={styles.stepsContent__dayView}>
          {doneCards.map((done) => (
            <Card key={done.title} title={done.title} img={done.img} />
          ))}
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
  toggleItem: PropTypes.func,
  setFeedback: PropTypes.func,
};
export default StepsContent;
