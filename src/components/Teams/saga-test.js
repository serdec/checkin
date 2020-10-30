import { describe } from 'riteway';
import { addMembersSaga, getTeams, saveTeam } from './saga';
import * as database from '../../services/database/database';
import { call, put } from 'redux-saga/effects';
import { loadTeams, addMembers, createTeam } from './reducer';
import { loginUser } from '../Checkins/Collection/saga';

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
      given: 'a login action',
      should: 'get the remote teams',
      expected: call(database.saveTeam, createTeamAction.payload),
      actual: iterator.next().value,
    });
    assert({
      given: 'a login action',
      should: 'update the user teams',
      expected: call(database.updateUserWithTeam, {
        teamId: createTeamAction.payload.id,
        user: createTeamAction.payload.owner,
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
      expected: call(database.addMembers, addMembersAction.payload),
      actual: iterator.next().value,
    });
    assert({
      given: 'an add member action',
      should: 'update the user teams',
      expected: call(database.updateUsersWithTeam, addMembersAction.payload),
      actual: iterator.next().value,
    });
  }
});
