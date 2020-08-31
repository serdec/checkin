import React from 'react';
import { Layout } from 'antd';
import styles from './app.module.css';
import { connect } from 'react-redux';
import {
  getItems,
  addItem,
  deleteItem,
} from '../reducers/checkins/dailyCheckin/list';
import {
  setFeedback,
  getFeedback,
} from '../reducers/checkins/dailyCheckin/feedback';
import { addCheckin } from '../reducers/checkins/checkinsCollection/checkins-collection';
import CheckinContent from './CheckinContent/checkin-content';

const { Content } = Layout;

const addField = (dispatch) => (listName) => (value) => {
  if (value === '') {
    return;
  }
  dispatch(addItem(listName)({ value }));
};
const deleteField = (dispatch) => (listName) => (id) => {
  dispatch(deleteItem(listName)(id));
};
const setFeedbackValue = (dispatch) => (feedbackName) => (value) => {
  dispatch(setFeedback(feedbackName)(value));
};
const mapStateToProps = (state) => ({
  yesterdayTasks: getItems(state.current.yesterdayTasks),
  yesterdayBlockers: getItems(state.current.yesterdayBlockers),
  todayTasks: getItems(state.current.todayTasks),
  todayBlockers: getItems(state.current.todayBlockers),
  doingWellFeedback: getFeedback(state.current.doingWellFeedback),
  needsImprovementFeedback: getFeedback(state.current.needsImprovementFeedback),
  latestCheckin: state.checkins,
});

const mapDispatchToProps = (dispatch) => ({
  addYesterdayTasks: addField(dispatch)('yesterdayTasks'),
  addYesterdayBlockers: addField(dispatch)('yesterdayBlockers'),
  addTodayTasks: addField(dispatch)('todayTasks'),
  addTodayBlockers: addField(dispatch)('todayBlockers'),
  setDoingWellFeedback: setFeedbackValue(dispatch)('doingWellFeedback'),
  setNeedsImprovementFeedback: setFeedbackValue(dispatch)(
    'needsImprovementFeedback'
  ),
  deleteYesterdayTasks: deleteField(dispatch)('yesterdayTasks'),
  deleteYesterdayBlockers: deleteField(dispatch)('yesterdayBlockers'),
  deleteTodayTasks: deleteField(dispatch)('todayTasks'),
  deleteTodayBlockers: deleteField(dispatch)('todayBlockers'),

  submitForm: ({
    id = '',
    date = 0,
    user = 'user1',
    team = 'my-team',
    yesterdayTasks = [],
    yesterdayBlockers = [],
    todayTasks = [],
    todayBlockers = [],
    doingWellFeedback = '',
    needsImprovementFeedback = '',
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
        doingWellFeedback,
        needsImprovementFeedback,
      })
    );
  },
});

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
