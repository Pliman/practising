import { put, fork, takeLatest, takeEvery, select } from 'redux-saga/effects';
import OrdersViewActions from '../actions/OrdersViewActions';
import {IOrder} from '../models/IOrder';
// import API from '../common/api';

function* loadOrdersStarted(action: {payload: {completed: boolean}}) {

    var inputParams = {...action.payload};
    try {
        // TODO: Ajax call here
        // const result = yield call(API.get, "orders", payload.completed);
        const result: IOrder[] = action.payload.completed ? 
            [{id: 1, desc: 'test1' + new Date(), completed: true}] :
            [{id: 2, desc: 'test2' + new Date(), completed: false}];

        yield put(OrdersViewActions.loadOrders.done({
            params: inputParams,
            result: {orders: result}
        }));
    } catch (e) {
         yield put(OrdersViewActions.loadOrders.failed({
            params: inputParams,
            error: {message: e.message}
        }));
    }
}

const ordersStateSelector = (state: any) => state.ordersView.orders;
function* addOrderStarted(action: {payload: IOrder}) {

    var inputParams = {...action.payload};
    try {
        // TODO: Ajax call here
        // const result = yield call(API.get, "orders", payload.completed);
        // get current store
        const orders = yield select(ordersStateSelector);
        const nextid = orders.reduce(function(max: number, x: IOrder) { return (x.id > max) ? x.id : max; }, 0) + 1;
        const result: IOrder = {id: nextid , desc: 'test' + nextid + ' ' + new Date(), completed: nextid % 2 > 0};

        yield put(OrdersViewActions.addOrder.done({
            params: inputParams,
            result: result
        }));
    } catch (e) {
         yield put(OrdersViewActions.addOrder.failed({
            params: inputParams,
            error: {message: e.message}
        }));
    }
}

function* deleteOrderStarted(action: {payload: {id: number}}) {

    const { payload: { id }} = action;
    var inputParams = {...action.payload};
    try {
        // TODO: Ajax delete call here
        // const result = yield call(API.delete, "orders", payload.id);
    
        yield put(OrdersViewActions.deleteOrder.done({
            params: inputParams,
            result: { id }
        }));
    } catch (e) {
         yield put(OrdersViewActions.deleteOrder.failed({
            params: inputParams,
            error: {message: e.message}
        }));
    }
}

export default function* watch() {
    yield [
        fork(takeLatest, OrdersViewActions.loadOrders.started.type, loadOrdersStarted),
        fork(takeLatest, OrdersViewActions.deleteOrder.started.type, deleteOrderStarted),
        fork(takeEvery, OrdersViewActions.addOrder.started.type, addOrderStarted )
    ];
}
