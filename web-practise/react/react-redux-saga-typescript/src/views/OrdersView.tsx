import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import OrdersList from '../components/orders/OrderList';
import {IOrder} from '../models/IOrder';
import {ResponsiveBreak } from '../models/ResponsiveBreak';
import ActionDispatcher from '../common/ActionDispatcher';
import {ISiteState} from '../IState';
import OrdersViewActions from '../actions/OrdersViewActions';

interface IOrderViewProps {
  orders: IOrder[];
  completedOnly: boolean;
  currentResponsive: ResponsiveBreak;
  loadOrdersAction: React.EventHandler<React.ChangeEvent<HTMLInputElement>>;
  deleteOrdersAction: (id: number) => any;
  addOrdersAction: (order: IOrder) => any;
  toggleCompletedOrdersAction: () => any;
  cycleResponsive: () => any;
}

class View extends React.Component<IOrderViewProps, void> {
  componentDidMount() {
    // Can we load ini
    // tslint:disable-next-line:no-console
    console.log('hit componentDidMount');
  }
  render() {
  
    const {orders, completedOnly, deleteOrdersAction, addOrdersAction, 
           toggleCompletedOrdersAction, currentResponsive} = this.props;
    // console.log(dispatch);
    // console.log(orders);
    return (
      <div className="Orders">
        current responsive setting(demo of sharing state): <label>{currentResponsive}</label>
        <h1>Orders</h1>
        <button 
            type="button"
            onClick={addOrdersAction.bind(null, {})}
        >Add Order
        </button>
        <br />
        <label>
          <input  
                type="checkbox" 
                checked={completedOnly} 
                onChange={toggleCompletedOrdersAction.bind(null, null)}
          /> Completed</label>
        <OrdersList 
          orders={completedOnly ? orders.filter(itm => itm.completed) : orders}
          deleteOrder={deleteOrdersAction}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<IOrder>) => { 
      var dispatcher = new ActionDispatcher(dispatch);
      return{
          loadOrdersAction: dispatcher.dispatchAsyncAction.bind(dispatcher, OrdersViewActions.loadOrders),
          addOrdersAction: dispatcher.dispatchAsyncAction.bind(dispatcher, OrdersViewActions.addOrder),
          deleteOrdersAction: dispatcher.dispatchAsyncAction.bind(dispatcher, OrdersViewActions.deleteOrder),
          toggleCompletedOrdersAction: dispatcher.dispatchAction.bind(dispatcher, OrdersViewActions.toggleShowCompleted)
      };
    };
const mapStateToProps = (state: ISiteState) => ({
        orders: state.ordersView.orders,
        completedOnly: state.ordersView.completedOnly,
        currentResponsive: state.settings.responsiveBreak
    });
export const OrderView = connect(
      mapStateToProps
    , mapDispatchToProps
    )(View);
     