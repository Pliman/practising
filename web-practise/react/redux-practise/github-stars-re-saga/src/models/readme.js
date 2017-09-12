import * as GithubAPI from '../services/github';

export default {
  namespace: 'readme',
  state: {},
  reducers: {
    save(state, { payload }) {
      const { repo, content } = payload;
      return {...state, [repo]: content};
    },
    'fetch/start' (state) {
      return {...state, readmeLoading: true};
    },

    'fetch/end' (state) {
      return {...state, readmeLoading: false};
    },
  },
  effects: {
    *fetch({ payload: repo }, { select, put, call }) {
      const { readme, user } = yield select(state => state);
      const { username, password } = user;

      if (!readme[repo]) {
        yield put({
          type: 'fetch/start',
        });
        const result = yield call(GithubAPI.getReadme, repo, username, password);
        yield put({
          type: 'save',
          payload: {
            repo,
            content: result.content,
          },
        });
        yield put({
          type: 'fetch/end',
        });
      }
    }
  },
  subscriptions: {},
};
