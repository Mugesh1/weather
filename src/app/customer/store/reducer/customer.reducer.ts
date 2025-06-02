import { createReducer, on } from '@ngrx/store';
import { Customer } from 'src/app/models/customer';
import * as CustomerActions from '../../../customer/store/action/customer.actions';

export const customerFeatureKey = 'customer';

export interface CustomerState {
  customer: Customer[];
}

export const initialState: CustomerState = {
  customer: []
};

export const CustomerReducer = createReducer(
  initialState,
  on(CustomerActions.addCustomer, (state: CustomerState, { customer }) => (
    {
      ...state,
      customer: [...state.customer, customer]
    }
  ))
);

