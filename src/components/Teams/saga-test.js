import { describe } from 'riteway';
import { addMembersSaga, getTeams, loginUser, saveTeam } from './saga';
import * as database from '../../services/database/database';
import { call, put } from 'redux-saga/effects';
import { loadTeams, addMembers, createTeam } from './reducer';

describe('teams saga', async (assert) => {
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
    const addMembersAction = addMembers();
    const iterator = addMembersSaga(addMembers());
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
});
