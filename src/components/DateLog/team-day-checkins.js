import React from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import CheckboxCard from '../Card/card';
import { CheckOutlined, CloseOutlined, UserOutlined } from '@ant-design/icons';
import styles from './date-log.module.css';
import cardStyles from '../Card/styles.module.css';
const { TabPane } = Tabs;

const TeamDayCheckins = ({ checkins = [] } = {}) => {
  const cards = [
    {
      title: 'Previous Tasks',
      // payload: checkin.previousTasks,
    },
    {
      title: 'Current Tasks',
    },
    {
      title: 'Previous Blockers',
    },
    {
      title: 'Doing Well',
    },
    {
      title: 'Needs Improvement',
    },
  ];
  return (
    <div className={styles.teamDayCheckins}>
      <Tabs tabPosition={'left'}>
        {checkins.map((checkin) => {
          return (
            <TabPane
              key={checkin.id}
              style={{ maxWidth: '70em' }}
              tab={
                <span>
                  <UserOutlined /> {checkin.user}{' '}
                </span>
              }
            >
              <div className={styles.checkinHistoryView}>
                <CheckboxCard title="Previous Tasks" size="small">
                  <div className={cardStyles.cardSummary}>
                    {checkin.previousTasks.map((item) => (
                      <li key={item.id}>
                        {item.active ? <CheckOutlined /> : <CloseOutlined />}{' '}
                        {item.value}
                      </li>
                    ))}
                  </div>
                </CheckboxCard>
                <CheckboxCard title="Current Tasks" size="small">
                  <div className={cardStyles.cardSummary}>
                    {checkin.currentTasks.map((item) => (
                      <li key={item.id}>
                        {item.active ? <CheckOutlined /> : <CloseOutlined />}{' '}
                        {item.value}
                      </li>
                    ))}
                  </div>
                </CheckboxCard>
                <CheckboxCard title="Previous Blockers" size="small">
                  <div className={cardStyles.cardSummary}>
                    {checkin.previousBlockers.map((item) => (
                      <li key={item.id}>
                        {item.active ? <CheckOutlined /> : <CloseOutlined />}{' '}
                        {item.value}
                      </li>
                    ))}
                  </div>
                </CheckboxCard>
                <CheckboxCard title="Current Blockers" size="small">
                  <div className={cardStyles.cardSummary}>
                    {checkin.currentBlockers.map((item) => (
                      <li key={item.id}>
                        {item.active ? <CheckOutlined /> : <CloseOutlined />}{' '}
                        {item.value}
                      </li>
                    ))}
                  </div>
                </CheckboxCard>
                <CheckboxCard title="Doing Well" size="small">
                  <div className={cardStyles.cardSummary}>
                    {checkin.doingWellFeedback}
                  </div>
                </CheckboxCard>
                <CheckboxCard title="Needs Improvement" size="small">
                  <div className={cardStyles.cardSummary}>
                    {checkin.needsImprovementFeedback}
                  </div>
                </CheckboxCard>
              </div>
            </TabPane>
          );
        })}
      </Tabs>
    </div>
  );
};

TeamDayCheckins.propTypes = {
  checkins: PropTypes.array,
};

export default TeamDayCheckins;
