import * as React from 'react';
import OrderListItem from './OrderListItem';
import {IOrder} from '../../models/IOrder';

interface IOrdersListProps {
  orders: IOrder[];
  deleteOrder: (id: number) => void;
};

class OrderList extends React.Component<IOrdersListProps, void> {
  render() {
      const { orders, deleteOrder } = this.props;

      return (
        <ul>
          {orders.map(o =>
           ( 
              <OrderListItem
                key={String(o.id)}
                order={o}
                deleteOrder={deleteOrder.bind(null)}
              />
            )
          )} 
        </ul>
    );
  }
}

export default OrderList;
