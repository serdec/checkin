import { describe } from 'riteway';
import { activeTeamReducer, setActiveTeam } from './reducer';

const createState = ({ id = '', name = '', owner = '' } = {}) => ({
  id,
  name,
  owner,
});
describe('active team', async (assert) => {
  {
    assert({
      given: 'no arguments',
      should: 'return the valid initial state',
      actual: activeTeamReducer(),
      expected: createState(),
    });
  }

  {
    const activeTeam = createState({
      id: '1',
      name: 'activeTeam',
      owner: 'owner@email.com',
    });
    assert({
      given: 'an active team',
      should: 'set the active team',
      actual: activeTeamReducer(activeTeamReducer(), setActiveTeam(activeTeam)),
      expected: activeTeam,
    });
  }
});
