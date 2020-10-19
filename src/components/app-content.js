import React, { useState } from 'react';
import { connect } from 'react-redux';
import DateLog from './DateLog/date-log';
import PropTypes from 'prop-types';
import NewCheckin from './Checkins/NewCheckin/new-checkin';
import { createNewCheckin } from './Checkins/NewCheckin/actions-selectors';
import ControlPanel from './ControlPanel/control-panel';
import { getTeams } from './Teams/reducer';
import { getSaveStatus } from './Checkins/Collection/save-checkin-states-reducer';

const mapStateToProps = (state) => ({
  teams: getTeams(state),
  saveStatus: getSaveStatus(state),
});
const mapDispatchStateToProps = {
  createNewCheckin,
};
const AppContent = ({ teams = [], saveStatus = '', createNewCheckin } = {}) => {
  const [visibleCheckinHistory, setVisibleCheckinHistory] = useState(true);
  const [simulateNetServError, setSimulateNetServError] = useState(false);

  return (
    <>
      <ControlPanel
        teams={teams}
        simulateNetServError={simulateNetServError}
        createNewCheckin={createNewCheckin}
        setSimulateNetServError={setSimulateNetServError}
        setVisibleCheckinHistory={setVisibleCheckinHistory}
      />
      {visibleCheckinHistory && saveStatus.status === 'success' ? (
        <DateLog />
      ) : (
        <NewCheckin
          onDone={() => setVisibleCheckinHistory(true)}
          simulateNetServError={simulateNetServError}
        />
      )}
    </>
  );
};

AppContent.propTypes = {
  saveStatus: PropTypes.object,
  teams: PropTypes.array,
  createNewCheckin: PropTypes.func,
};
export default connect(mapStateToProps, mapDispatchStateToProps)(AppContent);
