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
      <Tabs tabPosition={'left'}>
        {checkins.map((checkin) => {
          return (
            <TabPane key={checkin.id} tab={checkin.user}>
              <div className={styles.checkinHistoryView}>
                <CheckboxCard title="Previous Tasks" size="small">
                  {checkin.checkin.tasks.previous.map((item) => (
                    <li key={item.id}>
                      <CheckOutlined /> {item.value}
                    </li>
                  ))}
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
