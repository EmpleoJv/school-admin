import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  ChartComponent,
} from 'ng-apexcharts';
import { HeadDashboardService } from '../../_service/head-dashboard.service';
import { SecureStorageService } from 'src/app/login/_Auth/secure-storage.service';
import { ChangeDetectorRef } from '@angular/core';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
};

@Component({
  selector: 'app-most-coin-collected',
  templateUrl: './most-coin-collected.component.html',
  styleUrls: ['./most-coin-collected.component.scss'],
})
export class MostCoinCollectedComponent implements OnInit {
  @ViewChild('chart')
  chart!: ChartComponent;
  public chartOptions: ChartOptions;
  public dataFromDatabase: any;

  constructor(
    private headDashboardService: HeadDashboardService,
    private secureStorageService: SecureStorageService,
    private cdr: ChangeDetectorRef
  ) {
    this.chartOptions = {
      series: [
        {
          name: 'Secret Coins',
          data: [],
        },
      ],
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [],
        labels: {
          show: true,
        },
      },
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

      const filteredData = ds.filter(
        (student: any) => student.role === 'student'
      );
      this.dataFromDatabase = filteredData;
      console.log(this.dataFromDatabase);

      const studentNames = this.dataFromDatabase.map(
        (student: any) => student.first_name
      );
      const secretCoins = this.dataFromDatabase.map(
        (student: any) => student.secret_coins
      );

      this.chartOptions = {
        ...this.chartOptions,
        series: [
          {
            name: 'Secret Coins',
            data: secretCoins,
          },
        ],
        xaxis: {
          ...this.chartOptions.xaxis,
          categories: studentNames,
        },
      };

      // Trigger change detection to update the chart
      this.cdr.detectChanges();
      if (this.chart) {
        this.chart.updateOptions(this.chartOptions);
      }
    });
  }
}
