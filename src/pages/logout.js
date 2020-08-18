import React from 'react';
import withUser from '../lib/magic/with-user';

const Logout = () => {
  const handleSignOut = async () => {
    //await signOut();
  };

  handleSignOut();

  return <div></div>;
};

export default withUser(Logout);
