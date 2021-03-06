import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import LoginForm from '../components/LoginForm/login-form';
import React from 'react';
import PropType from 'prop-types';
import withUser from '../lib/magic/with-user';
import { loginUser } from '../components/Teams/saga';
import * as database from '../services/database/database';
import firebaseConfig from '../services/database/firebase.config';

const mapDispatchToProps = {
  onLogin: loginUser,
};
const Login = ({
  isUserReady,
  isSignedIn,
  onLogin,
  signIn,
  user,
  dbConfig,
}) => {
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (isSignedIn) {
      onLogin({ user: user.email });
      Router.push('/');
    } else {
      console.log('user is not signed in');
    }
  }, [isSignedIn, onLogin, user]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (errorMsg) setErrorMsg('');
    const email = e.currentTarget.email.value;
    database.initDB(dbConfig);
    try {
      if (isUserReady) {
        await signIn(email);
      }
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

export const getStaticProps = () => {
  return {
    props: {
      dbConfig: firebaseConfig,
    },
  };
};
Login.propTypes = {
  isUserReady: PropType.bool,
  isSignedIn: PropType.bool,
  onLogin: PropType.func,
  signIn: PropType.func,
  user: PropType.object,
  publicAddress: PropType.string,
  dbConfig: PropType.object,
};

export default connect(null, mapDispatchToProps)(withUser(Login));
