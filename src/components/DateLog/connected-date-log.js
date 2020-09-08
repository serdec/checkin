import { connect } from 'react-redux';

import { getCheckinByDay } from '../../reducers/checkins/checkinsCollection/checkins-collection';
import DateLog from './date-log';

const mapStateToProps = (state) => ({
  getCheckin: (date) => {
    console.log(state);
    return getCheckinByDay(state.checkins, date);
  },
});

export default connect(mapStateToProps)(DateLog);
