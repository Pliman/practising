import {Action} from 'redux';
import {IOrdersViewState} from '../IState';
import {isType} from 'typescript-fsa';
import OrdersViewActions from '../actions/OrdersViewActions'

const defaultState: IOrdersViewState = {
  completedOnly: false,
  orders : []
};

const reducer = (state = defaultState, action: Action): IOrdersViewState => {
  
  // tslint:disable-next-line:no-console
  console.log(state);
  // tslint:disable-next-line:no-console
  console.log(action);

  if (isType(action, OrdersViewActions.loadOrders.done)) {
      return {...state, 
        completedOnly: action.payload.params.completed, 
        orders: action.payload.result.orders
      };
  }else if (isType(action, OrdersViewActions.deleteOrder.done)) {
      const idx = state.orders.findIndex(itm => itm.id === action.payload.result.id);
      return {...state, 
        // remove the item from the array(immutablly)
        orders: [
            ...state.orders.slice(0, idx),
            ...state.orders.slice(idx + 1)
        ]
      };
  }else if (isType(action, OrdersViewActions.addOrder.done)) {
      return {
          ...state, 
          orders: [...state.orders, action.payload.result]
      };
  }else if (isType(action, OrdersViewActions.toggleShowCompleted)) {
      return {
          ...state, 
          completedOnly: !state.completedOnly, 
      };
  }
  
  return state; 
};

export default reducer;