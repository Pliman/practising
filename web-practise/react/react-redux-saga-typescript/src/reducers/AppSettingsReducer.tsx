import {Action} from 'redux';
import {IAppSettingsState} from '../IState';
import {isType} from 'typescript-fsa';
import AppSettingsActions from '../actions/AppSettingsActions'
import {ResponsiveBreak } from '../models/ResponsiveBreak';

const defaultState: IAppSettingsState = {
    responsiveBreak: ResponsiveBreak.Medium
};

const reducer = (state = defaultState, action: Action) : IAppSettingsState => {
    if (isType(action, AppSettingsActions.changeResponsiveBreak)) {
        return {
            ...state,
            responsiveBreak: (state.responsiveBreak + 1) % 3
        };
    }
    return state;
};

export default reducer;