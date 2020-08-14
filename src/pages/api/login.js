import 'firebase/firestore';

export default async function login(req, res) {
  res.statusCode = 200;
  try {
    //firebase.initializeApp({ ...firebaseConfig });
    //const db = firebase.firestore();
    // db.collection('users').add({
    //   first: 'Ada',
    //   last: 'Lovelace',
    //   born: 1815,
    // });
  } catch (e) {
    console.log(e);
  }
  res.end(JSON.stringify({ name: 'John Doe' }));
}
