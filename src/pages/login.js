import { useState } from 'react';
import Router from 'next/router';
import LoginForm from '../components/Login/login-form';
import React from 'react';
import PropType from 'prop-types';
import withUser from '../lib/magic/with-user';

const Login = ({ isUserReady, signIn }) => {
  // useUser({ redirectTo: '/', redirectIfFound: true });

  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    if (errorMsg) setErrorMsg('');

    const email = e.currentTarget.email.value;

    try {
      if (isUserReady) {
        console.log('signing in...');
        await signIn(email);
      }
      Router.push('/');
    } catch (error) {
      console.error('An unexpected error happened occurred:', error);
      setErrorMsg(error.message);
    }
  }

  return (
    <div className="login">
      <LoginForm errorMessage={errorMsg} onSubmit={handleSubmit} />
      <style jsx>{`
        .login {
          max-width: 21rem;
          margin: 0 auto;
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

Login.propTypes = {
  isUserReady: PropType.bool,
  signIn: PropType.func,
  user: PropType.object,
  publicAddress: PropType.string,
};

export default withUser(Login);
