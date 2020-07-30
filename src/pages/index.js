import React from 'react';
import Layout from '../components/layout';
import withUser from '../lib/magic/with-user';
import PropTypes from 'prop-types';
import CheckinForm from '../components/CheckinForm/checkin-form';

const Home = ({ user }) => {
  return (
    <Layout>
      <CheckinForm />
    </Layout>
  );
};

Home.propTypes = {
  user: PropTypes.object,
};

export default withUser(Home);
