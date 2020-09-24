import React, { useState } from 'react';
import { connect } from 'react-redux';
import DateLog from './DateLog/date-log';
import CheckinContent from './Checkin/checkin-content';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { getTeams } from '../store/root-reducer';

const mapStateToProps = (state) => ({
  teams: getTeams(state),
});
const AppContent = ({ teams = [] } = {}) => {
  const [visibleCheckinHistory, setVisibleCheckinHistory] = useState(true);
  return (
    <>
      <Button onClick={() => setVisibleCheckinHistory(true)}>
        View Checkins
      </Button>
      {teams.length > 0 ? (
        <Button onClick={() => setVisibleCheckinHistory(false)}>
          New Checkin
        </Button>
      ) : (
        <h3 style={{ display: 'inline' }}> Create a team...</h3>
      )}
      {visibleCheckinHistory ? (
        <DateLog />
      ) : (
        <CheckinContent onDone={() => setVisibleCheckinHistory(true)} />
      )}
    </>
  );
};

AppContent.propTypes = {
  teams: PropTypes.array,
};
export default connect(mapStateToProps)(AppContent);
