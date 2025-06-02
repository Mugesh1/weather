import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SunriseComponent } from './sunrise.component';

describe('SunriseComponent', () => {
  let component: SunriseComponent;
  let fixture: ComponentFixture<SunriseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SunriseComponent]
    });
    fixture = TestBed.createComponent(SunriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
