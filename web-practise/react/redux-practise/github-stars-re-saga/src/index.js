import dva from 'dva';
import pick from 'lodash.pick';

const data = localStorage.getItem('github');
const initialState = data ? JSON.parse(data) : {};

const app = dva({
  initialState,
  onStateChange() {
    localStorage.setItem('github', JSON.stringify(pick(app._store.getState(), ['stars', 'user'])));
  },
});

app.model(require('./models/header'));
app.model(require('./models/user'));
app.model(require('./models/stars'));
app.model(require('./models/readme'));

app.router(require('./router'));

app.start('#root');
