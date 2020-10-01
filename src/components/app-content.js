import React, { useState } from 'react';
import { connect } from 'react-redux';
import DateLog from './DateLog/date-log';
import PropTypes from 'prop-types';
import { getCheckins, getTeams } from '../store/root-reducer';
import CurrentCheckin from './Checkins/CurrentCheckin/current-checkin';
import { createNewCheckin } from './Checkins/CurrentCheckin/reducer';
import ControlPanel from './ControlPanel/control-panel';
import { getSaveStatus } from './Checkins/Collection/reducer';

const mapStateToProps = (state) => ({
  teams: getTeams(state),
  saveStatus: getSaveStatus(getCheckins(state)),
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
          <CurrentCheckin
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
