import * as GithubAPI from '../services/github';

function extractPageFromUrl(url) {
  if (url) return url.split('&page=')[1];
}

export default {
  namespace: 'stars',
  state: {
    data: [],
    syncAllFinished: false,
  },
  reducers: {
    'sync/empty' (state) {
      return {...state, data: [], syncAllFinished: false};
    },

    'sync/save' (state, action) {
      return {...state, data: action.payload, syncAllFinished: true};
    },

    'sync/firstpage' (state, action) {
      return {...state, data: action.payload};
    },

    'select/save' (state, action) {
      return {...state, selectedStarId: action.payload};
    },

    'sync/start' (state, action) {
      return {...state, syncLoading: true, syncStatus: action.payload};
    },

    'sync/end' (state) {
      return {...state, syncLoading: false, syncStatus: ''};
    },

    'sync/progress' (state, action) {
      const { next, last } = action.payload;
      return {...state, syncStatus: `sync page ${next} of ${last}`};
    },

    'unstar/start' (state) {
      return {...state, unstarLoading: true};
    },

    'unstar/end' (state) {
      const data = state.data.filter(item => item.id !== state.selectedStarId);
      return {...state, data, selectedStarId: null, unstarLoading: false};
    },
  },
  effects: {
    *sync(action, { select, put }) {
      const syncAllFinished = yield select(state => state.stars.syncAllFinished);
      if (syncAllFinished) {
        yield put({ type: 'syncUpdate' });
      } else {
        yield put({ type: 'syncAll' });
      }
    },
    *syncUpdate(action, { select, put, call }) {
      yield put({
        type: 'sync/start',
        payload: '',
      });

      const { user, stars } = yield select(state => state);
      const { username, password, userInfo } = user;
      const url = `https://api.github.com/users/${userInfo.login}/starred?per_page=100&page=1`;
      const { result } = yield call(GithubAPI.fetchStars, url, username, password);
      const ids = stars.data.map(item => item.id);
      const data = result.filter(item => ids.indexOf(item.id) === -1);

      yield put({
        type: 'sync/save',
        payload: data.concat(stars.data),
      });
      yield put({
        type: 'sync/end',
      });
    },
    *syncAll(action, { select, put, call }) {
      yield put({
        type: 'sync/start',
        payload: 'sync page 1',
      });

      const { username, password, userInfo } = yield select(state => state.user);
      const url = `https://api.github.com/users/${userInfo.login}/starred?per_page=100&page=1`;
      let { links, result } = yield call(GithubAPI.fetchStars, url, username, password);
      let data = result;

      yield put({
        type: 'sync/firstpage',
        payload: data,
      });

      yield put({
        type: 'sync/progress',
        payload: {
          next: extractPageFromUrl(links.next),
          last: extractPageFromUrl(links.last),
        },
      });

      while(links.next) {
        const object =  yield call(GithubAPI.fetchStars, links.next, username, password);
        links = object.links;
        result = object.result;

        data = data.concat(result);
        yield put({
          type: 'sync/progress',
          payload: {
            next: extractPageFromUrl(links.next),
            last: extractPageFromUrl(links.last),
          },
        });
      }

      yield put({
        type: 'sync/end',
      });
      yield put({
        type: 'sync/save',
        payload: data,
      });
    },
    *select({ payload: { id, repo }}, { put }) {
      yield put({
        type: 'select/save',
        payload: id,
      });
      yield put({
        type: 'readme/fetch',
        payload: repo,
      });
    },
    *unstar({ payload: repo }, { select, put, call }) {
      yield put({
        type: 'unstar/start',
      });
      const { username, password } = yield select(state => state.user);
      const res = yield call(GithubAPI.unstar, repo, username, password);
      if (res.status !== 204) {
        throw Error('Error: status should be 204');
      }
      yield put({
        type: 'unstar/end',
      });
    },
  },
  subscriptions: {},
};
