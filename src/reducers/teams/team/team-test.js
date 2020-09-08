import { describe } from 'riteway';
import {
  teamReducer,
  createTeam,
  deleteTeam,
  addMember,
  removeMember,
  getMembers,
  updateTeam,
} from './team';

const createState = () => {
  return [];
};
const newTeam = ({
  id = '',
  creationDate = 0,
  name = '',
  owner = '',
  members = [owner],
  checkIns = [],
} = {}) => ({
  id,
  creationDate,
  name,
  owner,
  members,
  checkIns,
});
describe('teamReducer', async (assert) => {
  {
    assert({
      given: 'no arguments',
      should: 'return the initial valid state',
      actual: teamReducer(),
      expected: createState(),
    });
  }
  {
    const team = newTeam();
    assert({
      given: 'a create team action',
      should: 'add a new team to the state',
      actual: teamReducer(undefined, createTeam(team)),
      expected: [team],
    });
  }
  {
    const teamId = 'myTeam';
    assert({
      given: 'a team name',
      should: 'delete the team from the state',
      actual: teamReducer([newTeam({ id: teamId })], deleteTeam(teamId)),
      expected: teamReducer(),
    });
  }
  {
    const teamId = 'myTeam';
    const userId = 'user1';
    const teamOwner = userId;
    const user2 = 'user2';
    const members = [userId, user2];

    assert({
      given: 'a new member',
      should: 'add a new member to the team',
      actual: teamReducer(
        [newTeam({ id: teamId, owner: teamOwner })],
        addMember({ teamId, userId: user2 })
      ),
      expected: [newTeam({ id: teamId, owner: teamOwner, members })],
    });
  }

  {
    const teamId = 'myTeam';
    const user1 = 'user1';
    const user2 = 'user2';
    const teamOwner = user1;
    const actions = [
      createTeam(newTeam({ id: teamId, owner: teamOwner })),
      addMember({ teamId, userId: user2 }),
      removeMember({ teamId, userId: user1 }),
    ];

    assert({
      given: 'a member id',
      should: 'remove the member from the team',
      actual: getMembers(actions.reduce(teamReducer, teamReducer()), teamId),
      expected: [user2],
    });
  }

  {
    const teamName = 'myTeam';
    const newName = 'newName';
    const team = newTeam({ name: teamName });
    const updatedTeam = newTeam({ name: newName });
    const actions = [createTeam(team), updateTeam(updatedTeam)];

    assert({
      given: 'an updated team',
      should: 'change the name of the team',
      actual: actions.reduce(teamReducer, teamReducer()),
      expected: [updatedTeam],
    });
  }
});
