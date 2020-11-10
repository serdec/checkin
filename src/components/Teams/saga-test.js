import { describe } from 'riteway';
import {
  addUsersSaga,
  getTeams,
  loginUser,
  removeUsersSaga,
  saveTeam,
  deleteTeamSaga,
  watchDeleteTeam,
  watchGetTeams,
} from './saga';
import * as database from '../../services/database/database';
import { call, put, takeEvery } from 'redux-saga/effects';
import {
  loadTeams,
  addUsers,
  createTeam,
  deleteTeam,
  removeUser,
} from './reducer';

describe('teams saga', async (assert) => {
  {
    const iterator = watchGetTeams();
    assert({
      given: 'no arguments',
      should: 'call the getTeamSaga',
      expected: takeEvery(loginUser().type, getTeams),
      actual: iterator.next().value,
    });
  }
  {
    const loginAction = loginUser();
    const iterator = getTeams(loginAction);
    assert({
      given: 'a login action',
      should: 'get the remote teams',
      expected: call(database.getTeams, loginAction.payload),
      actual: iterator.next().value,
    });
    assert({
      given: 'a login action',
      should: 'load the remote teams',
      expected: put(loadTeams()),
      actual: iterator.next({ status: 200, payload: [] }).value,
    });
  }
  {
    const createTeamAction = createTeam();
    const iterator = saveTeam(createTeamAction);
    assert({
      given: 'a create action',
      should: 'save the team',
      expected: call(database.saveTeam, createTeamAction.payload),
      actual: iterator.next().value,
    });
    assert({
      given: 'a create action',
      should: 'add the team to the right user',
      expected: call(database.addTeamToUsers, {
        teamId: createTeamAction.payload.id,
        users: createTeamAction.payload.owners,
      }),
      actual: iterator.next().value,
    });
  }
  {
    const iterator = watchDeleteTeam();
    assert({
      given: 'no arguments',
      should: 'call the deleteTeamSaga',
      expected: takeEvery(deleteTeam().type, deleteTeamSaga),
      actual: iterator.next().value,
    });
  }
  {
    const deleteTeamAction = deleteTeam();
    const iterator = deleteTeamSaga(deleteTeamAction);
    assert({
      given: 'a create action',
      should: 'save the team',
      expected: call(database.deleteTeam, deleteTeamAction.payload),
      actual: iterator.next().value,
    });
    assert({
      given: 'a deleteTeam action',
      should: 'remove the team from the users',
      expected: call(database.deleteTeamFromUsers, deleteTeamAction.payload),
      actual: iterator.next().value,
    });
  }
  {
    const addMembersAction = addUsers();
    const iterator = addUsersSaga(addUsers());
    assert({
      given: 'an add member action',
      should: "add member to the team's members",
      expected: call(database.addUsersToTeam, addMembersAction.payload),
      actual: iterator.next().value,
    });
    assert({
      given: 'an add member action',
      should: 'update the user teams',
      expected: call(database.addTeamToUsers, addMembersAction.payload),
      actual: iterator.next().value,
    });
  }
  {
    const removeUserAction = removeUser({ listName: 'members' });
    const iterator = removeUsersSaga(removeUserAction);
    assert({
      given: 'a remove member action, a team id and a user id',
      should: "remove the user from the team's members",
      expected: call(database.removeUsersFromTeam, removeUserAction.payload),
      actual: iterator.next().value,
    });
    assert({
      given: 'a remove member action, a team id and a user id',
      should: 'remove the team from the user',
      expected: call(database.removeTeamFromUsers, removeUserAction.payload),
      actual: iterator.next().value,
    });
  }
  {
    const removeUserAction = removeUser({ listName: 'owners' });
    const iterator = removeUsersSaga(removeUserAction);
    assert({
      given: 'a remove owner action, a team id and a user id',
      should: "remove the owner from the team's owners",
      expected: call(database.removeUsersFromTeam, removeUserAction.payload),
      actual: iterator.next().value,
    });
    assert({
      given: 'a remove owner action, a team id and a user id',
      should: 'be done after removing the user from the owners list',
      expected: true,
      actual: iterator.next().done,
    });
  }
});
