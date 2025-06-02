import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/models/customer';
import { selectCustomers } from '../store/selector/customer.selectors';
@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.scss']
})
export class CustomerViewComponent implements OnInit {

  customer$:Observable<Customer[]>;
  constructor(private store:Store) { }

  ngOnInit(): void {
  this.customer$ = this.store.pipe(select(selectCustomers))
  }
}
