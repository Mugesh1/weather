import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankAnalogyComponent } from './bank-analogy.component';

describe('BankAnalogyComponent', () => {
  let component: BankAnalogyComponent;
  let fixture: ComponentFixture<BankAnalogyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BankAnalogyComponent]
    });
    fixture = TestBed.createComponent(BankAnalogyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
