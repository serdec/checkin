import { useState } from 'react';
import Router from 'next/router';
import Layout from '../components/layout';
import Form from '../components/form';
import React from 'react';
import PropType from 'prop-types';
import withUser from '../lib/magic/with-user';

const Login = ({ signIn, user }) => {
  // useUser({ redirectTo: '/', redirectIfFound: true });

  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e) {
    event.preventDefault();

    if (errorMsg) setErrorMsg('');

    const email = e.currentTarget.email.value;

    const body = {
      email,
      user: user.publicAddress,
    };

    try {
      await signIn(email);
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        Router.push('/');
      } else {
        throw new Error(await res.text());
      }
      Router.push('/');
    } catch (error) {
      console.error('An unexpected error happened occurred:', error);
      setErrorMsg(error.message);
    }
  }

  return (
    <Layout>
      <div className="login">
        <Form errorMessage={errorMsg} onSubmit={handleSubmit} />
      </div>
      <style jsx>{`
        .login {
          max-width: 21rem;
          margin: 0 auto;
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
      `}</style>
    </Layout>
  );
};

Login.propTypes = {
  signIn: PropType.func,
  user: PropType.object,
  publicAddress: PropType.string,
};

export default withUser(Login);
