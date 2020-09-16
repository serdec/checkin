import React, { useState } from 'react';
import DateLog from './DateLog/date-log';
import CheckinContent from './Checkin/checkin-content';

import { Button } from 'antd';
const AppContent = () => {
  const [visibleCheckinHistory, setVisibleCheckinHistory] = useState(true);
  return (
    <>
      <Button onClick={() => setVisibleCheckinHistory(true)}>
        View Checkins
      </Button>
      <Button onClick={() => setVisibleCheckinHistory(false)}>
        New Checkin
      </Button>
      {visibleCheckinHistory ? (
        <DateLog />
      ) : (
        <CheckinContent onDone={() => setVisibleCheckinHistory(true)} />
      )}
    </>
  );
};

export default AppContent;
