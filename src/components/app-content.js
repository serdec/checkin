import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import History from './History/history';
import PropTypes from 'prop-types';
import NewCheckin from './Checkins/NewCheckin/new-checkin';
import {
  createNewCheckin,
  getCheckinInitialData,
} from './Checkins/NewCheckin/reducer';
import { saveCheckin } from './Checkins/Collection/save-checkin-states-reducer';
import ControlPanel from './ControlPanel/control-panel';
import { getTeams } from './Teams/reducer';
import { getSaveStatus } from './Checkins/Collection/save-checkin-states-reducer';
import Loading from './Loading/loading';
import Retry from './Retry/retry';
import {
  addItem,
  deleteItem,
  toggleItem,
} from './Checkins/NewCheckin/list-reducer';
import { setFeedback } from './Checkins/NewCheckin/feedback-reducer';
import { useCheckinFeatures } from './use-checkin-features';
import styles from './app.module.css';
import { setActiveTeam, getActiveTeamId } from './Teams/ActiveTeam/reducer';

const mapStateToProps = (state) => ({
  activeTeamId: getActiveTeamId(state.activeTeam),
  teams: getTeams(state.teams),
  saveStatus: getSaveStatus(state),
  checkin: getCheckinInitialData(state),
});
const mapDispatchStateToProps = {
  setActiveTeam,
  createNewCheckin,
  addItem,
  deleteItem,
  toggleItem,
  setFeedback,
  saveCheckin,
};

const AppContent = ({
  activeTeamId = '',
  teams = [],
  checkin = {},
  saveStatus = '',
  user = {},
  setActiveTeam,
  ...dispatchActions
} = {}) => {
  useEffect(() => {
    if (activeTeamId === '' && teams.length > 0) setActiveTeam(teams[0]);
  }, [activeTeamId, setActiveTeam, teams]);

  const { saveCheckin, loading, retry, history } = useCheckinFeatures({
    checkinActions: dispatchActions,
    saveStatus,
    checkin,
    user,
    activeTeamId,
  });

  const checkinActions = {
    addItem: dispatchActions.addItem,
    deleteItem: dispatchActions.deleteItem,
    toggleItem: dispatchActions.toggleItem,
    setFeedback: dispatchActions.setFeedback,
    saveCheckin,
  };
  return (
    <div className={styles.appContent}>
      <ControlPanel
        teams={teams}
        createNewCheckin={dispatchActions.createNewCheckin}
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
    </div>
  );
};

AppContent.propTypes = {
  activeTeamId: PropTypes.string,
  checkin: PropTypes.object,
  user: PropTypes.object,
  saveStatus: PropTypes.object,
  saveCheckinEnancher: PropTypes.object,
  setActiveTeam: PropTypes.func,
  teams: PropTypes.array,
  createNewCheckin: PropTypes.func,
};
export default connect(mapStateToProps, mapDispatchStateToProps)(AppContent);
