import React, { useState } from 'react';
import { connect } from 'react-redux';
import DateLog from './DateLog/date-log';
import PropTypes from 'prop-types';
import { getCheckins, getTeams } from '../store/root-reducer';
import CheckinContent from './Checkins/CurrentCheckin/current-checkin';
import ControlPanel from './ControlPanel/control-panel';
import { getSaveStatus } from './Checkins/Collection/reducer';

const mapStateToProps = (state) => ({
  teams: getTeams(state),
  saveStatus: getSaveStatus(getCheckins(state)),
});
const AppContent = ({ teams = [], saveStatus = '' } = {}) => {
  const [visibleCheckinHistory, setVisibleCheckinHistory] = useState(true);
  const [simulateNetServError, setSimulateNetServError] = useState(false);

  return (
    <>
      <ControlPanel
        setSimulateNetServError={setSimulateNetServError}
        simulateNetServError={simulateNetServError}
        setVisibleCheckinHistory={setVisibleCheckinHistory}
        teams={teams}
      />
      {visibleCheckinHistory && saveStatus.status === 'success' ? (
        <DateLog />
      ) : (
        <CheckinContent
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
};
export default connect(mapStateToProps)(AppContent);
