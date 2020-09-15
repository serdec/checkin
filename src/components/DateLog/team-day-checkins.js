import React from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import CheckboxCard from '../Checkin/Steps/StepsContent/checkbox-card';
import { CheckOutlined } from '@ant-design/icons';
import styles from './date-log.module.css';

const { TabPane } = Tabs;

const TeamDayCheckins = ({ checkins = [] } = {}) => {
  return (
    <div className={styles.teamDayCheckins}>
      <Tabs>
        {checkins.map((checkin) => {
          return (
            <TabPane key={checkin.id} tab={checkin.user}>
              <div className={styles.checkinHistoryView}>
                <CheckboxCard title="Previous Tasks" size="small">
                  {checkin.checkin.yesterday.yesterdayTasks.map((item) => (
                    <li key={item.id}>
                      <CheckOutlined /> {item.value}
                    </li>
                  ))}
                </CheckboxCard>
                <CheckboxCard
                  title="Previous Blockers"
                  size="small"
                ></CheckboxCard>
                <CheckboxCard title="Current Tasks" size="small"></CheckboxCard>
                <CheckboxCard
                  title="Current Blockers"
                  size="small"
                ></CheckboxCard>
                <CheckboxCard title="Doing Well" size="small"></CheckboxCard>
                <CheckboxCard
                  title="Needs Improvement"
                  size="small"
                ></CheckboxCard>
              </div>
              <div>{JSON.stringify(checkin)}</div>
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
