import actionCreatorFactory from 'typescript-fsa';
import {IOrder} from '../models/IOrder';

const name = 'ORDERS_VIEW';
const actionCreator = actionCreatorFactory(name);
export default {
  loadOrders : actionCreator.async<{completed: boolean}, // start type
                      {orders: IOrder[]},   // success type
                      {message: string}   // error type
                      >('LOAD_ORDERS'),
  deleteOrder : actionCreator.async<{id: number}, // start type
                      {id: number},   // success type
                      {message: string}   // error type
                      >('DELETE_ORDER'),
  addOrder : actionCreator.async<IOrder, // start type
                      IOrder,   // success type
                      {message: string}   // error type
                      >('ADD_ORDER'),
  toggleShowCompleted : actionCreator<void>('TOGGLE_COMPLETED_ORDERS') //This action does not have success/error it does not trigger side effects
}; 