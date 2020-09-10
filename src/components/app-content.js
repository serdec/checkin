import React from 'react';
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
import { getDateString } from '../lib/date/date';
import CheckinContent from './Checkin/checkin-content';
import DateLog from './DateLog/date-log';
import cuid from 'cuid';

const mapStateToProps = (state) => ({
  yesterdayTasks: getItems(state.current.yesterdayTasks),
  yesterdayBlockers: getItems(state.current.yesterdayBlockers),
  todayTasks: getItems(state.current.todayTasks),
  todayBlockers: getItems(state.current.todayBlockers),
  doingWellFeedback: getFeedback(state.current.doingWellFeedback),
  needsImprovementFeedback: getFeedback(state.current.needsImprovementFeedback),
  latestCheckin: state.checkins,
});

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
    id = cuid(),
    date = getDateString(new Date()),
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

const AppContent = () => (
  <>
    <DateLog />
    <ConnectedCheckinContent />
  </>
);

export default AppContent;
