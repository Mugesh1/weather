import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestuarantAnalogyComponent } from './restuarant-analogy.component';

describe('RestuarantAnalogyComponent', () => {
  let component: RestuarantAnalogyComponent;
  let fixture: ComponentFixture<RestuarantAnalogyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestuarantAnalogyComponent]
    });
    fixture = TestBed.createComponent(RestuarantAnalogyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
