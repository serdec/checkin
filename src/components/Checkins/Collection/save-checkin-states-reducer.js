import dsm from 'redux-dsm';
// prettier-ignore
export const getSaveStatus = (state) => state.saveStatus;

const saveCheckinsStates = [
  'initial',
  'idle',
  [
    'save checkin',
    'savingCheckin',
    [
      'report save checkin error',
      'error',
      ['save checkin', 'savingCheckin'],
      ['save checkin simulate error', 'savingCheckin'],
    ],
    [
      'report save checkin success',
      'success',
      ['save checkin', 'savingCheckin'],
      ['save checkin simulate error', 'savingCheckin'],
    ],
  ],
  ['save checkin simulate error', 'savingCheckin'],
];

export const {
  actionCreators: {
    saveCheckin,
    saveCheckinSimulateError,
    reportSaveCheckinError,
    reportSaveCheckinSuccess,
  },
  reducer,
} = dsm({
  component: 'Checkin',
  description: 'save checkin',
  actionStates: saveCheckinsStates,
});

const obj = dsm({
  component: 'Checkin',
  description: 'save checkin',
  actionStates: saveCheckinsStates,
});

console.log({ obj });
export default { reducer };
