import React from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styles from '../checkins.module.css';
import ListSummaryCard from '../../Cards/SummaryCards/list-summary-card';
import FeedbackSummaryCard from '../../Cards/SummaryCards/feedback-summary-card';
const { TabPane } = Tabs;

const TeamDayCheckins = ({ checkins = [] } = {}) => {
  const listsCards = [
    {
      title: 'Previous Tasks',
      content: 'previousTasks',
    },
    {
      title: 'Current Tasks',
      content: 'currentTasks',
    },
    {
      title: 'Previous Blockers',
      content: 'previousBlockers',
    },
    {
      title: 'Current Blockers',
      content: 'currentBlockers',
    },
  ];
  const feedbacksCards = [
    {
      title: 'Doing Well',
      content: 'doingWellFeedback',
    },
    {
      title: 'Needs Improvement',
      content: 'needsImprovementFeedback',
    },
  ];
  return (
    <div className={styles.teamDayCheckins}>
      <Tabs tabPosition={'top'}>
        {checkins.map((checkin) => (
          <TabPane
            key={checkin.id}
            style={{ maxWidth: '70em' }}
            tab={
              <span>
                <UserOutlined /> {checkin.user.split('@')[0]}{' '}
              </span>
            }
          >
            <div className={styles.checkinView}>
              {listsCards.map((list) => (
                <ListSummaryCard
                  key={list.title}
                  title={list.title}
                  list={checkin[list.content]}
                />
              ))}
              {feedbacksCards.map((feedback) => (
                <FeedbackSummaryCard
                  key={feedback.title}
                  feedback={feedback}
                  checkin={checkin}
                />
              ))}
            </div>
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

TeamDayCheckins.propTypes = {
  checkins: PropTypes.array,
};

export default TeamDayCheckins;
