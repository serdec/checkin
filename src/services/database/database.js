import * as firebase from 'firebase/app';
import 'firebase/firestore';

import firebaseConfig from './firebase.config';

let db;

export const initDB = () => {
  try {
    console.log(`FIND ME: ${process.env.FIREBASE_PROJECT_ID}`);
    console.log(`FIND ME: ${firebaseConfig.projectId}`);
    firebase.initializeApp({
      ...firebaseConfig,
    });
    db = firebase.firestore();
  } catch (err) {
    // ignore 'already exists' message
    if (/already exists/.test(err.message)) return;
    else throw err;
  }
};

export const save = (action) => {
  db.collection('users')
    .doc(action.user)
    .collection('records')
    .doc(action.payload.id)
    .set({
      ...action.payload,
    })
    .then(function () {
      console.log('Document written', action.payload);
    })
    .catch(function (error) {
      console.error('Error adding document: ', error);
    });
};

export const get = async (user) => {
  const data = await db
    .collection('users')
    .doc(user)
    .collection('records')
    .get();

  return data;
};
