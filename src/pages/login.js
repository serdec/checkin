import React from 'react';
import Router from 'next/router';
import PropType from 'prop-types';

const Login = () => {
  const handleLogin = async () => {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.status === 200) {
      Router.push('/');
    } else {
      throw new Error(await res.text());
    }
    Router.push('/');
  };
  handleLogin().then(console.log).catch(console.log);
  return <p>Hi!</p>;
};

Login.propTypes = {
  signIn: PropType.func,
  user: PropType.object,
  publicAddress: PropType.string,
};

export default Login;
