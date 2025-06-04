import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrillZoneComponent } from './grill-zone.component';

describe('GrillZoneComponent', () => {
  let component: GrillZoneComponent;
  let fixture: ComponentFixture<GrillZoneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GrillZoneComponent]
    });
    fixture = TestBed.createComponent(GrillZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
