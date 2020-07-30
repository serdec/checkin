import * as admin from 'firebase-admin';

export default async function login(req, res) {
  try {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      databaseURL: 'https://rejection-app-2a0d7.firebaseio.com',
    });

    admin
      .auth()
      .createCustomToken('pippo')
      .then(function (customToken) {
        // Send token back to client
        console.log('customToken', customToken);
      })
      .catch(function (error) {
        console.log('Error creating custom token:', error);
      });
    // const didToken = req.headers.authorization.substr(7);
    // const metadata = await magic.users.getMetadataByToken(didToken);
    // const session = { ...metadata };
    // The token is a string with the encrypted session
    // const token = await encryptSession(session);
    // setTokenCookie(res, token);
    res.status(200).send({ done: true });
  } catch (error) {
    console.log('error generating token');
    res.status(error.status || 500).end(error.message);
  }
}
