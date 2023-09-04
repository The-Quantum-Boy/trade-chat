import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeChart2Component } from './trade-chart2.component';

describe('TradeChart2Component', () => {
  let component: TradeChart2Component;
  let fixture: ComponentFixture<TradeChart2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradeChart2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TradeChart2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
