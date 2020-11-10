import { describe } from 'riteway';
import { activeTeamReducer, getActiveTeam, setActiveTeam } from './reducer';

const createState = ({ id = '' } = {}) => ({
  id,
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
    });
    assert({
      given: 'an active team',
      should: 'set the active team',
      actual: activeTeamReducer(activeTeamReducer(), setActiveTeam(activeTeam)),
      expected: activeTeam,
    });
  }
  {
    const activeTeam = createState({
      id: '1',
    });
    const state = activeTeamReducer(
      activeTeamReducer(),
      setActiveTeam(activeTeam)
    );
    assert({
      given: 'an active team',
      should: 'get the active team',
      actual: getActiveTeam(state),
      expected: activeTeam,
    });
  }
});
