
function watcher(fn) {
  return [fn, { type: 'watcher' }];
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default {
  namespace: 'header',
  state: {},
  reducers: {
    'search/save' (state, action) {
      return {...state, keyword: action.payload };
    },
  },
  effects: {
    search: watcher(function*({put, call, take, cancel, fork}) {
      function* headerSearchSet(query) {
        try {
          yield call(delay, 300);
          yield put({
            type: 'search/save',
            payload: query,
          });
        } catch(e) {
          // eslint-disable-line
          console.error(e);
        }
      }

      let previousQuery, task;
      while (true) {
        const {payload: query} = yield take('header/search');
        if (query !== previousQuery) {
          if (task) yield cancel(task);
          task = yield fork(headerSearchSet, query);
          previousQuery = query;
        }
      }
    }),
  },
  subscriptions: {},
};
