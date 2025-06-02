import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeavyRainComponent } from './heavy-rain.component';

describe('HeavyRainComponent', () => {
  let component: HeavyRainComponent;
  let fixture: ComponentFixture<HeavyRainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeavyRainComponent]
    });
    fixture = TestBed.createComponent(HeavyRainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
