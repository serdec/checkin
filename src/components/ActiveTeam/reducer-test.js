import { describe } from 'riteway';
import { activeTeamReducer, setActiveTeam } from './reducer';

describe('active team', async (assert) => {
  {
    assert({
      given: 'no arguments',
      should: 'return the valid initial state',
      actual: activeTeamReducer(),
      expected: '',
    });
  }

  {
    const activeTeam = 'TEAM';
    assert({
      given: 'a string',
      should: 'set the active team',
      actual: activeTeamReducer(activeTeamReducer(), setActiveTeam(activeTeam)),
      expected: activeTeam,
    });
  }
});
