import { Component, OnInit } from '@angular/core';
import { SecureStorageService } from 'src/app/login/_Auth/secure-storage.service';
import { HeadDashboardService } from '../../_service/head-dashboard.service';

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexFill,
  ApexDataLabels,
  ApexLegend,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  fill: ApexFill;
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-most-players-section',
  templateUrl: './most-players-section.component.html',
  styleUrls: ['./most-players-section.component.scss'],
})
export class MostPlayersSectionComponent implements OnInit {
  public chartOptions: ChartOptions;
  public dataFromDatabase: any;

  constructor(
    private headDashboardService: HeadDashboardService,
    private secureStorageService: SecureStorageService
  ) {
    this.chartOptions = {
      series: [],
      chart: {
        width: 380,
        type: 'donut',
      },
      labels: [],
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: 'gradient',
      },
      legend: {
        formatter: function (val, opts) {
          return val + ' - ' + opts.w.globals.series[opts.seriesIndex];
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };
  }

  ngOnInit() {
    this.loadHeadAnalytics();
  }

  loadHeadAnalytics() {
    const userId = this.secureStorageService.getItem('userId');
    console.log(userId);
    this.headDashboardService.getAllStudentsData().subscribe((res: any) => {
      const ds = res.data;

      const userType = ds.find((teacher: any) => teacher.id === userId);
      const filteredData = ds.filter(
        (student: any) => student.role === 'student'
      );
      this.dataFromDatabase = filteredData;
      // console.log(this.dataFromDatabase);

      const sectionCounts = this.dataFromDatabase.reduce(
        (acc: any, student: any) => {
          acc[student.section] = (acc[student.section] || 0) + 1;
          return acc;
        },
        {}
      );

      this.chartOptions.series = Object.values(sectionCounts);
      this.chartOptions.labels = Object.keys(sectionCounts);
    });
  }
}
