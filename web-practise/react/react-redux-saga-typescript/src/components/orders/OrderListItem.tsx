import * as React from 'react';
import {IOrder} from '../../models/IOrder';

interface IOrderItemProps {
  key: string;
  order: IOrder;
  deleteOrder: ({id}: {id: number}) => void;
}

class OrderListItem extends React.Component<IOrderItemProps, null> {
  render() {
    const {order, deleteOrder} = this.props;
    return (
        <li>
            {order.desc} <button onClick={deleteOrder.bind(null, {id: order.id})}>X</button>
        </li>
    );
  }
}

export default OrderListItem;
