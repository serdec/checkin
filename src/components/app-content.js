import React from 'react';
import { Layout } from 'antd';
import styles from './app.module.css';
import { connect } from 'react-redux';
import {
  getItems,
  addItem,
  deleteItem,
} from '../reducers/checkins/dailyCheckin/daily-checkin';
import {
  getLatestCheckin,
  addCheckin,
} from '../reducers/checkins/checkinsCollection/checkins-collection';
import CheckinContent from './CheckinContent/checkin-content';

const { Content } = Layout;

const addInputField = (dispatch) => (value) => {
  if (value === '') {
    return;
  }
  dispatch(addItem({ value }));
};

const mapStateToProps = (state) => ({
  latestCheckin: getLatestCheckin(state),
  tasks: getItems(state),
});

const mapDispatchToProps = (dispatch) => {
  return {
    addInputField: addInputField(dispatch),

    onDeleteClick: (id) => {
      dispatch(deleteItem(id));
    },

    submitForm: ({
      id = '',
      date = 0,
      user = 'user1',
      team = 'my-team',
      yesterdayTasks = [],
      yesterdayBlockers = [],
      todayTasks = [],
      todayBlockers = [],
      doingWell = '',
      needsImprovements = '',
    } = {}) => {
      dispatch(
        addCheckin({
          id,
          date,
          user,
          team,
          yesterdayTasks,
          yesterdayBlockers,
          todayTasks,
          todayBlockers,
          doingWell,
          needsImprovements,
        })
      );
    },
  };
};

const ConnectedCheckinContent = connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckinContent);

const AppContent = () => {
  return (
    <Content className={styles.sitLayoutContent}>
      <ConnectedCheckinContent />
    </Content>
  );
};

export default AppContent;
