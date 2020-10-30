import * as firebase from 'firebase/app';
import 'firebase/firestore';

import firebaseConfig from './firebase.config';

const USERS_COLLECTION = 'USERS';
const TEAMS_COLLECTION = 'TEAMS';
const CHECKINS = 'CHECKINS';

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
const getUserTeamList = async ({ user }) => {
  let teams;
  console.log('GEEEEEET TEAMS');
  console.log({ user });
  await db
    .collection(USERS_COLLECTION)
    .doc(user)
    .get()
    .then((doc) => {
      if (doc.exists) {
        teams = doc.data().teams;
      }
    })
    .catch((e) => {
      console.log(e);
    });
  return teams;
};
export const getTeams = async ({ user }) => {
  let response = {};
  let data = [];
  let teams = getUserTeamList({ user });
  await db
    .collection(TEAMS_COLLECTION)
    .where('id', 'in', teams)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, ' => ', doc.data());
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

export const updateUserWithTeam = async ({ teamId = '', user = '' } = {}) => {
  await db
    .collection(USERS_COLLECTION)
    .doc(user)
    .set(
      { teams: firebase.firestore.FieldValue.arrayUnion(teamId) },
      { merge: true }
    );
};
export const updateUsersWithTeam = async ({ teamId = '', users = [] } = {}) => {
  users.forEach(async (user) => {
    updateUserWithTeam({ teamId, user });
  });
};
export const addMembers = async ({ teamId, users }) => {
  users.forEach(async (user) => {
    await db
      .collection(TEAMS_COLLECTION)
      .doc(teamId)
      .update({
        members: firebase.firestore.FieldValue.arrayUnion(user),
      })
      .then(() => {
        console.log('Document successfully written!');
      })
      .catch((error) => {
        console.log(
          `Error updating team members ${user}, tean: ${teamId}, error: ${error}`
        );
      });
  });
};

export const saveTeam = async (team) => {
  let saveTeamResponse = {};

  await db
    .collection(TEAMS_COLLECTION)
    .doc(team.id)
    .set({
      ...team,
    })
    .then(function () {
      console.log('Document written', team);
      saveTeamResponse.status = 200;
    })
    .catch(function (error) {
      console.error('Error adding document: ', error);
      saveTeamResponse.status = 500;
    });
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
