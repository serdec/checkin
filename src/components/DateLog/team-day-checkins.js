import React from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import CheckboxCard from '../Checkin/Steps/StepsContent/checkbox-card';
import { CheckOutlined, CloseOutlined, UserOutlined } from '@ant-design/icons';
import styles from './date-log.module.css';
import cardStyles from '../Checkin/checkin-content.module.css';
const { TabPane } = Tabs;

const TeamDayCheckins = ({ checkins = [] } = {}) => {
  return (
    <div className={styles.teamDayCheckins}>
      <Tabs tabPosition={'left'}>
        {checkins.map((checkin) => {
          return (
            <TabPane
              key={checkin.id}
              tab={
                <span>
                  <UserOutlined /> {checkin.user}{' '}
                </span>
              }
            >
              <div className={styles.checkinHistoryView}>
                <CheckboxCard title="Previous Tasks" size="small">
                  <div className={cardStyles.cardSummary}>
                    {checkin.contributions.tasks.previous.map((item) => (
                      <li key={item.id}>
                        {item.active ? <CheckOutlined /> : <CloseOutlined />}{' '}
                        {item.value}
                      </li>
                    ))}
                  </div>
                </CheckboxCard>
                <CheckboxCard title="Current Tasks" size="small">
                  <div className={cardStyles.cardSummary}>
                    {checkin.contributions.tasks.current.map((item) => (
                      <li key={item.id}>
                        {item.active ? <CheckOutlined /> : <CloseOutlined />}{' '}
                        {item.value}
                      </li>
                    ))}
                  </div>
                </CheckboxCard>
                <CheckboxCard title="Previous Blockers" size="small">
                  <div className={cardStyles.cardSummary}>
                    {checkin.contributions.blockers.previous.map((item) => (
                      <li key={item.id}>
                        {item.active ? <CheckOutlined /> : <CloseOutlined />}{' '}
                        {item.value}
                      </li>
                    ))}
                  </div>
                </CheckboxCard>
                <CheckboxCard title="Current Blockers" size="small">
                  <div className={cardStyles.cardSummary}>
                    {checkin.contributions.blockers.current.map((item) => (
                      <li key={item.id}>
                        {item.active ? <CheckOutlined /> : <CloseOutlined />}{' '}
                        {item.value}
                      </li>
                    ))}
                  </div>
                </CheckboxCard>
                <CheckboxCard title="Doing Well" size="small">
                  <div className={cardStyles.cardSummary}>
                    {checkin.contributions.feedbacks.doingWell}
                  </div>
                </CheckboxCard>
                <CheckboxCard title="Needs Improvement" size="small">
                  <div className={cardStyles.cardSummary}>
                    {checkin.contributions.feedbacks.needsImprovement}
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
