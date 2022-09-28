import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowYourCapitalComponent } from './grow-your-capital.component';

describe('GrowYourCapitalComponent', () => {
  let component: GrowYourCapitalComponent;
  let fixture: ComponentFixture<GrowYourCapitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrowYourCapitalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrowYourCapitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
