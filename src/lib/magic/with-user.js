import React from 'react';
import useMagicLink from './use-magic-link';

const apiKey = process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY;

const withUser = (Component) => (props) => {
  const signInStatusChanged = (...args) => {
    // eslint-disable-next-line
    console.log('sign in status changed: ', ...args);
  };

  const { signIn, signOut, user, isMagicInitialized } = useMagicLink(
    apiKey,
    signInStatusChanged
  );

  return (
    <Component
      {...props}
      signIn={signIn}
      signOut={signOut}
      isSignedIn={user.isSignedIn}
      user={user}
      isUserReady={isMagicInitialized}
    />
  );
};

export default withUser;
