import React from 'react';
import { useStore } from 'react-redux';

const Team = () => {
  const store = useStore();
  console.log(store.getState());
  return <div>CiaoTeam</div>;
};

export default Team;
