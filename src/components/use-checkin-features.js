import { useEffect, useState } from 'react';

const noop = () => { };

const useSaveCheckin = ({
  checkin = {},
  user = {},
  saveCheckin = noop,
  setVisibleCheckinHistory = noop,
} = {}) => () => {
  saveCheckin({ ...checkin, user: user.email });
  setVisibleCheckinHistory(true);
};
// Resends the previous checkin. If the simulate error from the save enhancher is still active,
// dispatches an error, it saves the checkin correctly otherwise.
const useRetry = ({ saveStatus = {}, saveCheckin = noop } = {}) => {
  const [retry, setRetry] = useState(false);

  useEffect(() => {
    saveStatus.status === 'error' ? setRetry(true) : setRetry(false);
  }, [saveStatus]);

  return {
    visible: retry,
    setRetry,
    onClick: () => saveCheckin(saveStatus.payload),
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
// Make it visible every time a user selects a new team
const useHistory = (activeTeamId) => {
  const [visible, setVisible] = useState(true);
  const [currentTeam, setCurrentTeam] = useState(activeTeamId);

  useEffect(() => {
    if (currentTeam !== activeTeamId) setVisible(true);
    setCurrentTeam(activeTeamId);
  }, [activeTeamId, currentTeam]);

  return {
    visible,
    setVisible,
  };
};

// A hook to handle the checkin logic,
export const useCheckinFeatures = ({
  checkin,
  user,
  checkinActions = {},
  saveStatus = {},
  activeTeamId = '',
} = {}) => {
  const history = useHistory(activeTeamId);
  const loading = useLoading({ saveStatus });
  const retry = useRetry({
    saveStatus,
    saveCheckin: checkinActions.saveCheckin,
  });
  const saveCheckin = useSaveCheckin({
    checkin,
    user,
    saveCheckin: checkinActions.saveCheckin,
    setVisibleCheckinHistory: history.setVisible,
  });

  return {
    saveCheckin,
    retry,
    loading,
    history,
  };
};
