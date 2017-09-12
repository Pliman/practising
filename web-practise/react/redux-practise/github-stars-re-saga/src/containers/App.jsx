import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';

import * as _actions from '../actions/index';
import appSelectors from '../selectors/appSelectors';

import Stars from '../components/Stars/Stars';
import Header from '../components/Header/Header';
import Login from '../components/Login/Login';
import Sidebar from '../components/Sidebar/Sidebar';
import Detail from '../components/Detail/Detail';

import 'normalize.css';
import style from './App.less';

class App extends Component {
  render() {
    const { user, stars, headers, readme, actions, detail, filteredStars } = this.props;
    if (!user.login) {
      return <Login actions={actions}
                    loginErrorMsg={user.loginErrorMsg}
                    loginLoading={user.loginLoading} />;
    }

    return (<div className={style.normal}>
      <Header syncLoading={stars.syncLoading} syncStatus={stars.syncStatus} actions={actions} />
      <div className={style.mainSection}>
        <Sidebar userInfo={user.userInfo} starsCount={stars.data.length} actions={actions} />
        <Stars filteredStars={filteredStars}
               selectedStarId={stars.selectedStarId}
               actions={actions}
        />
        <Detail unstarLoading={stars.unstarLoading}
                readmeLoading={readme.readmeLoading}
                repo={detail.repo}
                readme={detail.readme}
                actions={actions}
                stars={stars}
        />
      </div>
    </div>);
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(_actions, dispatch),
  };
}

export default connect(appSelectors, mapDispatchToProps)(App);
