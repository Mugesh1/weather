import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as customerReducer from '../../store/reducer/customer.reducer';

export const SelectCustomerState = createFeatureSelector<customerReducer.CustomerState>(
  customerReducer.customerFeatureKey
)

export const selectCustomers = createSelector(
  SelectCustomerState,
  (state:customerReducer.CustomerState) => state.customer
)