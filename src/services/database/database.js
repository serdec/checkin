import * as firebase from 'firebase/app';
import 'firebase/firestore';

import firebaseConfig from './firebase.config';

const USERS_COLLECTION = 'USERS';
const CHECKINS = 'CHECKINS';
const TEAMS = 'TEAMS';

let db;

const init = () => {
  try {
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
  } catch (err) {
    // ignore 'already exists' message
    if (/already exists/.test(err.message)) return;
    else throw err;
  }
  return db;
};
init();

export const getTeams = async (user) => {
  let data = [];
  await db
    .collection(USERS_COLLECTION)
    .doc(user)
    .collection(TEAMS)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data());
        data.push(doc.data());
      });
    });
  return data;
};
export const saveTeam = (action) => {
  db.collection(USERS_COLLECTION)
    .doc(action.payload.user)
    .collection(TEAMS)
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

export const getCheckins = async (user) => {
  let data = [];
  await db
    .collection(USERS_COLLECTION)
    .doc(user)
    .collection(CHECKINS)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data());
        data.push(doc.data());
      });
    });
  return data;
};
export const saveCheckin = ({ payload }) => {
  let response = {};

  db.collection(USERS_COLLECTION)
    .doc(payload.user)
    .collection(CHECKINS)
    .doc(payload.id)
    .set({
      ...payload,
    })
    .then(function () {
      console.log('Document written', payload);
      response.status = '200';
    })
    .catch(function (error) {
      console.error('Error adding document: ', error);
      response.status = '500';
    });

  return response;
};
