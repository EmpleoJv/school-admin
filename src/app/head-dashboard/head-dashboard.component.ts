import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { HeaderNameService } from '../shared/component/header/_service/header-name.service';
import { SecureStorageService } from '../login/_Auth/secure-storage.service';

import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexFill,
} from 'ng-apexcharts';
import { HeadDashboardService } from './_service/head-dashboard.service';
import { MatTableDataSource } from '@angular/material/table';
import { HeadDashboardModel } from '../model/head-dashboard.model';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-head-dashboard',
  templateUrl: './head-dashboard.component.html',
  styleUrls: ['./head-dashboard.component.scss'],
})
export class HeadDashboardComponent implements OnInit {
  @Input() headerName: String = 'Leaderboard';

  constructor(
    private headDashboardService: HeadDashboardService,
    private headerService: HeaderNameService,
    private secureStorageService: SecureStorageService
  ) {}

  ngOnInit() {
    this.headerService.setHeaderName('Head Dashboard');
  }
}
