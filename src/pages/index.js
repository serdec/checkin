import React from 'react';
import PropTypes from 'prop-types';
import App from '../components/app';

const Home = () => {
  return <App />;
};

Home.propTypes = {
  db: PropTypes.object,
};

export default Home;
