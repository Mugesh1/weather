import { createAction, props } from '@ngrx/store';
import { Customer } from 'src/app/models/customer';

// export const addCustomers = createActionGroup({
//   source: 'Customer',
//   events: {
//     'Add Customers':  props<{ customer: Customer }>(),
//     'Load Customers':  emptyProps(),
//   }
// });

export const addCustomer = createAction(
  '[Customer] Add Customer',
  props<{ customer: Customer }>()
);
