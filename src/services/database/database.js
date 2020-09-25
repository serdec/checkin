import * as firebase from 'firebase/app';
import 'firebase/firestore';

import firebaseConfig from './firebase.config';

const USERS_COLLECTION = 'USERS';
const TEAMS_COLLECTION = 'TEAMS';
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

export const getTeams = async () => {
  let response = {};
  let data = [];
  await db
    .collection(TEAMS_COLLECTION)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data());
        data.push(doc.data());
      });
      response.status = 200;
      response.payload = data;
    })
    .catch((error) => {
      console.log('Error fetching teams, error: ', error);
      response.status = 500;
    });

  return response;
};

const updateMembers = async ({ user, name, id }) => {
  let response = {};
  await db
    .collection(USERS_COLLECTION)
    .doc(user)
    .collection(TEAMS_COLLECTION)
    .doc(name)
    .set(
      {
        name,
        id,
      },
      { merge: true }
    )
    .then(() => {
      response.status = 200;
    })
    .catch((error) => {
      console.log(`Error updating team member ${user}, error: ${error}`);
      response.status = 500;
    });
};

export const saveTeam = async (action) => {
  let saveTeamResponse = {};
  let updateMembersResponse = {};

  await db
    .collection(TEAMS_COLLECTION)
    .doc(action.payload.name)
    .set({
      ...action.payload,
    })
    .then(function () {
      console.log('Document written', action.payload);
      saveTeamResponse.status = 200;
    })
    .catch(function (error) {
      console.error('Error adding document: ', error);
      saveTeamResponse.status = 500;
    });

  updateMembersResponse = updateMembers(action.payload);

  if (updateMembersResponse !== 200) return updateMembersResponse;

  return saveTeamResponse;
};

export const getCheckins = async (user) => {
  let response = {};
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
      response.status = 200;
      response.payload = data;
    })
    .catch((error) => {
      console.log('Error getting checkins:', error);
      response.status = 500;
    });
  return response;
};
export const saveCheckin = async ({ payload }) => {
  let response = {};

  await db
    .collection(USERS_COLLECTION)
    .doc(payload.user)
    .collection(CHECKINS)
    .doc(payload.id)
    .set({
      ...payload,
    })
    .then(function () {
      console.log('Document written', payload);
      response.status = 200;
    })
    .catch(function (error) {
      console.error('Error adding document: ', error);
      response.status = 500;
    });

  return response;
};
