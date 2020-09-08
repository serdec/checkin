import cuid from 'cuid';
import { describe } from 'riteway';
import {
  teamsCollectionReducer,
  addTeam,
  deleteTeam,
} from './teams-collection';

const newTeam = ({
  id = cuid(),
  name = id,
  img = '',
  creationDate = new Date(),
  users = [],
} = {}) => ({
  id,
  name,
  img,
  creationDate,
  users,
});

describe('teams collection', async (assert) => {
  assert({
    given: 'no arguments',
    should: 'return the valid initial state',
    actual: teamsCollectionReducer(),
    expected: [],
  });

  {
    const team = newTeam();
    const actualState = teamsCollectionReducer(
      teamsCollectionReducer(),
      addTeam(team)
    );
    assert({
      given: 'a new team',
      should: 'add the new team to the current state',
      actual: actualState,
      expected: [team],
    });
  }

  {
    const team1 = newTeam();
    const team2 = newTeam();
    const team3 = newTeam();

    const actions = [team1, team2].map(addTeam);
    const expected = actions.reduce(
      teamsCollectionReducer,
      teamsCollectionReducer()
    );
    const state = teamsCollectionReducer(expected, addTeam(team3));

    assert({
      given: 'a team',
      should: 'delete it from the current state',
      actual: teamsCollectionReducer(state, deleteTeam(team3.id)),
      expected,
    });
  }
});
