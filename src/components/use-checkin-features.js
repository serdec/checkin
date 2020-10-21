import { useEffect, useState } from 'react';

const noop = () => {};

// Simulates network/server error.
// when simulateNetServError is true,
// the save action dispatches an error
const useSaveCheckinEnancher = ({
  checkin = {},
  user = {},
  saveCheckin = noop,
  saveCheckinSimulateError = noop,
  setVisibleCheckinHistory = noop,
} = {}) => {
  const [simulateNetServError, setSimulateNetServError] = useState(false);
  const [save, setSave] = useState(() => saveCheckin);

  useEffect(() => {
    simulateNetServError
      ? setSave(() => saveCheckinSimulateError)
      : setSave(() => saveCheckin);
  }, [simulateNetServError, saveCheckin, saveCheckinSimulateError]);

  const saveCheckinEnancher = {
    description: 'Simulates a network/server error while sending the checkin',
    simulateNetServError,
    setSimulateNetServError,
    save: () => {
      save({
        ...checkin,
        user: user.email,
      });
      setVisibleCheckinHistory(true); //set checkin history view visible after save;
    },
  };

  return saveCheckinEnancher;
};

// Resends the previous checkin. If the simulate error from the save enhancher is still active,
// dispatches an error, it saves the checkin correctly otherwise.
const useRetry = ({ saveStatus = {}, saveCheckinEnancher = {} } = {}) => {
  const [retry, setRetry] = useState(false);

  useEffect(() => {
    saveStatus.status === 'error' ? setRetry(true) : setRetry(false);
  }, [saveStatus]);

  return {
    visible: retry,
    onClick: () => saveCheckinEnancher.save(saveStatus.payload),
  };
};

// If the saveStatus in the Redux state is set to savingCheckin,
// it sets the loading variable to true.
const useLoading = ({ saveStatus }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    saveStatus.status === 'savingCheckin'
      ? setLoading(true)
      : setLoading(false);
  }, [saveStatus]);
  return loading;
};

// Set whether the checkins history should be visible or not
const useHistory = () => {
  const [visible, setVisible] = useState(true);
  return {
    visible,
    setVisible,
  };
};

// A hook to handle the checkin logic,
export const useCheckinFeatures = ({
  checkinActions = {},
  saveStatus = {},
  checkin = {},
  user = {},
} = {}) => {
  const history = useHistory();
  const loading = useLoading({ saveStatus });
  const saveCheckinEnancher = useSaveCheckinEnancher({
    saveCheckin: checkinActions.saveCheckin,
    saveCheckinSimulateError: checkinActions.saveCheckinSimulateError,
    checkin,
    user,
    setVisibleCheckinHistory: history.setVisible,
  });
  const retry = useRetry({ saveStatus, saveCheckinEnancher });

  return {
    saveCheckinEnancher,
    retry,
    loading,
    history,
  };
};
