import {AsyncActionCreators, ActionCreator} from 'typescript-fsa';
export default class ActionDispatcher {
  private _dispatch: Function;
  constructor(dispatch: Function) {
    this._dispatch = dispatch;
  }

 dispatchAsyncAction(action: AsyncActionCreators<{}, {}, {}>, args: object) {
        this._dispatch(action.started(args));
  }

  dispatchAction(action: ActionCreator<{}>, args: object) {
        this._dispatch(action(args));
  }
}
