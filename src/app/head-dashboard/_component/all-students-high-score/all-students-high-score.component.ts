import { Component } from '@angular/core';
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
import { HeadDashboardService } from '../../_service/head-dashboard.service';
import { SecureStorageService } from 'src/app/login/_Auth/secure-storage.service';
import { HeaderNameService } from 'src/app/shared/component/header/_service/header-name.service';

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
  selector: 'app-all-students-high-score',
  templateUrl: './all-students-high-score.component.html',
  styleUrls: ['./all-students-high-score.component.scss'],
})
export class AllStudentsHighScoreComponent {
  public chartOptions: ChartOptions;
  public dataFromDatabase: any;
  constructor(
    private headDashboardService: HeadDashboardService,
    private headerService: HeaderNameService,
    private secureStorageService: SecureStorageService
  ) {
    this.chartOptions = {
      series: [
        {
          name: 'Total Score',
          data: [],
        },
      ],
      chart: {
        height: 350,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: 'top',
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val.toString();
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ['#304758'],
        },
      },
      xaxis: {
        categories: [],
        position: 'top',
        labels: {
          offsetY: -18,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: 'gradient',
            gradient: {
              colorFrom: '#D8E3F0',
              colorTo: '#BED1E6',
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: true,
          offsetY: -35,
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'horizontal',
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [50, 0, 100, 100],
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function (val) {
            return val.toString();
          },
        },
      },
      title: {
        text: 'Students With Highest Score',
        offsetY: 320,
        align: 'center',
        style: {
          color: '#444',
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

      const userType = ds.find((teacher: any) => teacher.id === userId);
      const filteredData = ds.filter(
        (student: any) => student.role === 'student'
      );
      this.dataFromDatabase = filteredData;
      // console.log(this.dataFromDatabase);

      const firstNames = this.dataFromDatabase.map(
        (student: any) => student.first_name + ', Section ' + student.section
      );
      const scores = this.dataFromDatabase.map(
        (student: any) => student.total_score
      );

      this.chartOptions = {
        ...this.chartOptions,
        xaxis: {
          ...this.chartOptions.xaxis,
          categories: firstNames,
        },
        series: [
          {
            name: 'Total Score',
            data: scores,
          },
        ],
      };
    });
  }
}
