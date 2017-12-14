import actionCreatorFactory from 'typescript-fsa';

const name = 'SETTINGS';
const actionCreator = actionCreatorFactory(name);
export default {
    changeResponsiveBreak: actionCreator<{}>('CHANGE_RESPONSIVE_BREAK')
};