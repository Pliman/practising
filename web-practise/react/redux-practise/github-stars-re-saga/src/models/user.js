import * as GithubAPI from '../services/github';

export default {
  namespace: 'user',
  state: {
    login: false,
  },
  reducers: {
    'login/start' (state) {
      return {...state, loginLoading: true};
    },

    'login/end' (state) {
      return {...state, loginLoading: false};
    },

    'login/error' (state, action) {
      return {...state, loginErrorMsg: action.payload};
    },

    'login/success' (state, action) {
      return {...state, ...action.payload, login: true, loginErrorMsg: '' };
    },
  },
  effects: {
    *login(action, { put }) {
      yield put({
        type: 'login/start',
      });

      const { username, password } = action.payload;
      const userInfo = yield GithubAPI.fetchUser(username, password);

      if (userInfo.message) {
        yield put({
          type: 'login/error',
          payload: userInfo.message,
        });
      } else {
        yield put({
          type: 'login/success',
          payload: {username, password, userInfo},
        });
        yield put({
          type: 'stars/sync',
        });
      }

      yield put({
        type: 'login/end',
      });
    },
  },
  subscriptions: {},
};
