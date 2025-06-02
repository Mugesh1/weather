import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindEffectComponent } from './wind-effect.component';

describe('WindEffectComponent', () => {
  let component: WindEffectComponent;
  let fixture: ComponentFixture<WindEffectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WindEffectComponent]
    });
    fixture = TestBed.createComponent(WindEffectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
