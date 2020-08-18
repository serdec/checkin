import React from 'react';

const Profile = () => {
  return (
    <>
      <h1>Profile</h1>
      {
        <>
          <p>Your session:</p>
          <pre>{JSON.stringify(null, 2)}</pre>
        </>
      }
    </>
  );
};

export default Profile;
