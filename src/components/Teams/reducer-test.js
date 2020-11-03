import { describe } from 'riteway';
import {
  teamReducer,
  createTeam,
  deleteTeam,
  updateTeam,
  addMember,
  addMembers,
  getMembers,
  removeMember,
  toggleTeamsVisibility,
  getTeamsVisibility,
} from './reducer';

const createState = ({ visible = false, items = [] } = {}) => ({
  visible,
  items,
});
const newTeam = ({
  id = '',
  creationDate = 0,
  name = '',
  owners = [],
  members = [...owners],
  checkIns = [],
} = {}) => ({
  id,
  creationDate,
  name,
  owners,
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
      expected: createState({ items: [team] }),
    });
  }
  {
    const teamId = 'myTeam';
    assert({
      given: 'a team name',
      should: 'delete the team from the state',
      actual: teamReducer(
        createState({ items: [newTeam({ id: teamId })] }),
        deleteTeam(teamId)
      ),
      expected: teamReducer(),
    });
  }
  {
    const teamId = 'myTeam';
    const user1 = 'user1';
    const teamOwners = [user1];
    const user2 = 'user2';
    const members = [user1, user2];

    assert({
      given: 'a new member',
      should: 'add a new member to the team',
      actual: teamReducer(
        createState({ items: [newTeam({ id: teamId, owners: teamOwners })] }),
        addMember({ teamId, userId: user2 })
      ),
      expected: createState({
        items: [newTeam({ id: teamId, owners: teamOwners, members })],
      }),
    });
  }
  {
    const teamId = 'myTeam';
    const user1 = 'user1';
    const user2 = 'user2';
    const user3 = 'user3';
    const teamOwners = [user1];
    const members = [user1, user2, user3];
    const actualState = teamReducer(
      createState({ items: [newTeam({ id: teamId, owner: teamOwners })] }),
      addMembers({ teamId, users: members })
    );
    const actualMembers = getMembers(actualState, teamId).sort();
    assert({
      given: 'a list of members',
      should: 'add a them to the team',
      expected: true,
      actual: actualMembers.includes(user1, user2, user3),
    });
  }

  {
    const teamId = 'myTeam';
    const user1 = 'user1';
    const user2 = 'user2';
    const teamOwners = [user1];
    const actions = [
      createTeam(newTeam({ id: teamId, owner: teamOwners })),
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
      expected: createState({ items: [updatedTeam] }),
    });
  }
  {
    assert({
      given: 'a toggle action and the initial team visibility',
      should: 'change the visibility to true',
      expected: true,
      actual: getTeamsVisibility(
        teamReducer(teamReducer(), toggleTeamsVisibility())
      ),
    });
  }
  {
    assert({
      given: 'a toggle action and the visible teams',
      should: 'change the visibility to false',
      expected: false,
      actual: getTeamsVisibility(
        teamReducer(createState({ visible: true }), toggleTeamsVisibility())
      ),
    });
  }
});
