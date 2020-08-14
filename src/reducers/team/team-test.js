import { describe } from 'riteway';
import { teamReducer, createTeam, deleteTeam, addMember } from './team';

const createState = () => {
  return [];
};
const newTeam = ({
  name = 'my-team',
  owner = 'user1',
  members = [],
  checkIns = [],
} = {}) => ({
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
    const teamName = 'my-team';
    const teamOwner = 'user1';

    assert({
      given: 'a create team action',
      should: 'add a new team to the state',
      actual: teamReducer(undefined, createTeam({ teamName, teamOwner })),
      expected: [newTeam()],
    });
  }
  {
    const teamName = 'my-team';
    assert({
      given: 'a team name',
      should: 'delete the team from the state',
      actual: teamReducer([newTeam(teamName)], deleteTeam(teamName)),
      expected: [],
    });
  }

  {
    const teamName = 'my-team';
    const userId = 'user1';
    const teamOwner = userId;
    const members = [userId];
    assert({
      given: 'a action to add a new member',
      should: 'add a new member to the team',
      actual: teamReducer(
        [newTeam({ teamName, teamOwner })],
        addMember({ teamName, userId })
      ),
      expected: [newTeam({ teamName, teamOwner, members })],
    });
  }
});
