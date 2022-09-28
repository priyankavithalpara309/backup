import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrategicPartnersComponent } from './strategic-partners.component';

describe('StrategicPartnersComponent', () => {
  let component: StrategicPartnersComponent;
  let fixture: ComponentFixture<StrategicPartnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StrategicPartnersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StrategicPartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
