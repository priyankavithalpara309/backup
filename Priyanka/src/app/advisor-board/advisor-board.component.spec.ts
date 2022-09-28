import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisorBoardComponent } from './advisor-board.component';

describe('AdvisorBoardComponent', () => {
  let component: AdvisorBoardComponent;
  let fixture: ComponentFixture<AdvisorBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvisorBoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvisorBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
