import React from 'react';
import PropTypes from 'prop-types';
import App from '../components/App';

const Home = () => {
  return <App />;
};

Home.propTypes = {
  db: PropTypes.object,
};

export default Home;
