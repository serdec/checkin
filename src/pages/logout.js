import React from 'react';
import withUser from '../lib/magic/with-user';
import Layout from '../components/layout';
import Router from 'next/router';

const Logout = () => {
  const handleSignOut = async () => {
    //await signOut();

    Router.push('/');
  };

  handleSignOut();

  return (
    <div>
      <Layout />
    </div>
  );
};

export default withUser(Logout);
