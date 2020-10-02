import { useEffect, useState } from 'react';
import { Magic } from 'magic-sdk';

import { usePromise } from './use-promise.js';
import { configureLocalStorage } from './use-local-storage.js';
import { createUser, noop, changed } from './magic-link-tools.js';

const useLocalStorage = configureLocalStorage('magicLinkUser');

const useMagicLink = (apiKey, signInStatusChanged = noop) => {
  // A promise that allows us to keep track of when the Magic
  // API is ready to use.
  const [magicReady, setMagicReady] = usePromise();
  // A convenient boolean for components to check.
  // We may need this to decide whether or not to render
  // a loading indicator.
  const [isMagicInitialized, setMagicInitialized] = useState(false);
  // A drop-in replacement for useState which also saves to
  // localStorage so we don't lose state between page reloads.
  const [user, setUser] = useLocalStorage(createUser());

  // Updating the user in hook state involves collecting
  // data and conditionally notifying the component
  // that the sign in status has changed.
  const updateUser = async (magicUser) => {
    // If magicUser is undefined, we need to
    // clear the user from hook state and notify
    // the component.
    if (!magicUser && user.isSignedIn) {
      const newUser = createUser();
      setUser(newUser);
      signInStatusChanged(newUser);
      return;
    }

    // Gather the user info.
    const userData = await Promise.all([
      magicUser.getMetadata(),
      magicUser.getIdToken(),
    ]);
    const { publicAddress, email } = userData[0];
    const sessionToken = userData[1];

    // We want to compare the old user and new
    // user to figure out if we need to notify
    // the component of a change.
    const oldUser = user;
    const newUser = {
      publicAddress,
      email,
      isSignedIn: true,
      sessionToken,
    };

    // The token changes every time we grab the user data
    // so we whitelist only the props we want to check for
    // changes.
    const checkProps = ['publicAddress', 'email', 'isSignedIn'];
    if (changed(oldUser, newUser, checkProps)) {
      signInStatusChanged(newUser);
    }

    // Finally! We can set the user in hook state.
    setUser(newUser);
  };

  // Given an email address, trigger the magic
  // link authentication flow.
  const signIn = async (email) => {
    // First, we make sure that the Magic API
    // is initialized.
    const magic = await magicReady;

    // Then, we check to see if the user is
    // already signed in to the Magic API.
    if (await magic.user.isLoggedIn()) {
      // They're signed in, so we need to
      // make sure that's reflected in our
      // state.
      await updateUser(magic.user);
      // And then notify the component.
      return signInStatusChanged(user);
    }

    // Otherwise, we trigger the auth flow.
    await magic.auth.loginWithMagicLink({ email });
    // And update the user in our hook state.
    return updateUser(magic.user);
  };

  // Sign the user out of Magic.
  const signOut = async () => {
    // First, wait for the Magic API to be ready.
    const magic = await magicReady;

    // If the user is logged in...
    if (await magic.user.isLoggedIn()) {
      // Log them out.
      await magic.user.logout();
      // Then clear the user data from hook state.
      return updateUser(null);
    }
  };

  // When the component mounts...
  useEffect(() => {
    (async () => {
      // First, we initialize the magic API with
      // our API key.
      const magic = new Magic(apiKey);

      // If the user is already logged in, we can
      // reflect that immediately and notify the component.
      if (await magic.user.isLoggedIn()) await updateUser(magic.user);

      // Either way, we need to resolve our promise.
      setMagicReady(magic);
      // And set the convenient boolean.
      setMagicInitialized(true);
    })();
    // This just disables an annoying ESLint rule we should
    // probably all stop using, since running once on mount
    // is such a common use case for useEffect.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // And here's all the convenient magic we're exposing for
  // the component. (See what I did there?)
  return { signIn, signOut, user, magicReady, isMagicInitialized };
};

export default useMagicLink;
