import { describe } from 'riteway';
import { ADD_QUESTION, LOGIN_USER } from '../../redux/action-types';

const createAction = ({
  type = ADD_QUESTION,
  user = 'user1',
  payload = {
    username: 'gennaro',
    age: 23,
  },
} = {}) => ({
  type,
  user,
  payload,
});

describe('users-saga', async (assert) => {});
