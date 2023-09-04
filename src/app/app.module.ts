import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TradeChartComponent } from './trade-chart/trade-chart.component';
import { TradeChart2Component } from './trade-chart2/trade-chart2.component';
import { RealtimeTradeChartComponent } from './realtime-trade-chart/realtime-trade-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    TradeChartComponent,
    TradeChart2Component,
    RealtimeTradeChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
