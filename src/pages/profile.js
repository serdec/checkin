import Layout from '../components/layout';
import React from 'react';

const Profile = () => {
  return (
    <Layout>
      <h1>Profile</h1>
      {
        <>
          <p>Your session:</p>
          <pre>{JSON.stringify(null, 2)}</pre>
        </>
      }
    </Layout>
  );
};

export default Profile;
