import * as firebase from 'firebase/app';
import 'firebase/firestore';

const USERS_COLLECTION = 'USERS';
const TEAMS_COLLECTION = 'TEAMS';
const CHECKINS = 'CHECKINS';

let db;

export const initDB = (config) => {
  try {
    console.log({ config });
    firebase.initializeApp(config);
  } catch (err) {
    // ignore 'already exists' message
    if (/already exists/.test(err.message)) return;
    else throw err;
  }
  db = firebase.firestore();
};

export const getTeams = async (user) => {
  let response = {};
  let data = [];
  await db
    .collection(TEAMS_COLLECTION)
    .where('members', 'array-contains', user)
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

export const addTeamToUser = async ({ teamId = '', user = '' } = {}) => {
  await db
    .collection(USERS_COLLECTION)
    .doc(user)
    .set(
      { teams: firebase.firestore.FieldValue.arrayUnion(teamId) },
      { merge: true }
    );
};
export const addTeamToUsers = async ({ teamId = '', users = [] } = {}) => {
  users.forEach(async (user) => {
    addTeamToUser({ teamId, user });
  });
};
export const addUsersToTeam = async ({ teamId, users }) => {
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

export const getCheckins = async (teamId) => {
  let response = {};
  let data = [];
  await db
    .collection(TEAMS_COLLECTION)
    .doc(teamId)
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
    .collection(TEAMS_COLLECTION)
    .doc(payload.teamId)
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
