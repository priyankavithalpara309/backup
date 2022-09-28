import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Information1Component } from './information1.component';

describe('Information1Component', () => {
  let component: Information1Component;
  let fixture: ComponentFixture<Information1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Information1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Information1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
