import dsm from 'redux-dsm';

// prettier-ignore
const saveCheckinsStates =
  ['initial', 'idle',
    ['save checkin', 'savingCheckin',
      ['report save checkin error', 'error',
        ['handle error', 'idle']
      ],
      ['report save checkin success', 'success',
        ['handle success', 'idle']
      ]
    ]
  ];

export const {
  actionCreators: { reportSaveCheckinError, reportSaveCheckinSuccess },
  reducer,
} = dsm({
  component: 'Checkin',
  description: 'save checkin',
  actionStates: saveCheckinsStates,
});
