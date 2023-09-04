import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealtimeTradeChartComponent } from './realtime-trade-chart.component';

describe('RealtimeTradeChartComponent', () => {
  let component: RealtimeTradeChartComponent;
  let fixture: ComponentFixture<RealtimeTradeChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealtimeTradeChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealtimeTradeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
