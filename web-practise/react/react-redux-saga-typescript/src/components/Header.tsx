import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {ResponsiveBreak } from '../models/ResponsiveBreak';
import ActionDispatcher from '../common/ActionDispatcher';
import {ISiteState} from '../IState';
import AppSettingsActions from '../actions/AppSettingsActions'

interface IProps {
    currentResponsive: ResponsiveBreak;
    cycleResponsive: () => any;
}

const Header = ({currentResponsive, cycleResponsive}: IProps) => (
    <header className="App-header">
        current responsive setting: <label>{currentResponsive}</label>
        <br />
        <button 
            type="button"
            onClick={cycleResponsive.bind(null, {})}
        >Toggle Responsive
        </button>
    </header>
);

const mapDispatchToProps = (dispatch: Dispatch<any>) => { 
      var dispatcher = new ActionDispatcher(dispatch);
      return{
          cycleResponsive: dispatcher.dispatchAction.bind(dispatcher, AppSettingsActions.changeResponsiveBreak)
      };
    };
const mapStateToProps = (state: ISiteState) => ({
        currentResponsive: state.settings.responsiveBreak
    });
export default connect(
      mapStateToProps
    , mapDispatchToProps
    )(Header);
