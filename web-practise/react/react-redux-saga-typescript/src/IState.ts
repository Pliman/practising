import { IOrder } from './models/IOrder';
import { ResponsiveBreak } from './models/ResponsiveBreak';

// All application state intefaces go in this file

export interface IOrdersViewState {
  orders: IOrder[];
  completedOnly: boolean;
}

export interface IAppSettingsState {
  responsiveBreak: ResponsiveBreak;
}

export interface ISiteState {
    ordersView: IOrdersViewState;
    settings: IAppSettingsState;
}