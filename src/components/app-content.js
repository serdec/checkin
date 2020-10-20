import React from 'react';
import { connect } from 'react-redux';
import History from './History/history';
import PropTypes from 'prop-types';
import NewCheckin from './Checkins/NewCheckin/new-checkin';
import {
  createNewCheckin,
  getCheckinInitialData,
} from './Checkins/NewCheckin/actions-selectors';
import {
  saveCheckin,
  saveCheckinSimulateError,
} from './Checkins/Collection/save-checkin-states-reducer';
import ControlPanel from './ControlPanel/control-panel';
import { getTeams } from './Teams/reducer';
import { getSaveStatus } from './Checkins/Collection/save-checkin-states-reducer';
import Loading from './Loading/loading';
import Retry from './Retry/retry';
import { addItem, deleteItem, toggleItem } from './CheckboxForm/reducer';
import { setFeedback } from './Feedback/reducer';
import withUser from '../lib/magic/with-user';
import { useCheckinFeatures } from './use-checkin-features';

const mapStateToProps = (state) => ({
  teams: getTeams(state),
  saveStatus: getSaveStatus(state),
  checkin: getCheckinInitialData(state),
});
const mapDispatchStateToProps = {
  createNewCheckin,
  addItem,
  deleteItem,
  toggleItem,
  setFeedback,
  saveCheckin,
  saveCheckinSimulateError,
};

const AppContent = ({
  teams = [],
  checkin = {},
  saveStatus = '',
  user = {},
  ...dispatchActions
} = {}) => {
  const { saveCheckinEnancher, loading, retry, history } = useCheckinFeatures({
    checkinActions: dispatchActions,
    saveStatus,
    checkin,
    user,
  });

  const checkinActions = {
    addItem: dispatchActions.addItem,
    deleteItem: dispatchActions.deleteItem,
    toggleItem: dispatchActions.toggleItem,
    setFeedback: dispatchActions.setFeedback,
    save: saveCheckinEnancher.save,
  };
  return (
    <>
      <ControlPanel
        teams={teams}
        createNewCheckin={dispatchActions.createNewCheckin}
        simulateNetServError={saveCheckinEnancher.simulateNetServError}
        setSimulateNetServError={saveCheckinEnancher.setSimulateNetServError}
        setVisibleCheckinHistory={history.setVisible}
      />
      {loading && <Loading />}
      {!loading && retry.visible && <Retry retryAction={retry.onClick} />}
      {history.visible && !retry.visible && !loading && <History />}
      {!loading && !retry.visible && !history.visible && (
        <NewCheckin
          checkin={checkin}
          checkinActions={checkinActions}
          user={user}
        />
      )}
    </>
  );
};

AppContent.propTypes = {
  checkin: PropTypes.object,
  user: PropTypes.object,
  saveStatus: PropTypes.object,
  saveCheckinEnancher: PropTypes.object,
  teams: PropTypes.array,
  createNewCheckin: PropTypes.func,
};
export default connect(
  mapStateToProps,
  mapDispatchStateToProps
)(withUser(AppContent));
