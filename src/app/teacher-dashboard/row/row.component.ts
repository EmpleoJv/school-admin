import { Component, OnInit, ViewChild } from '@angular/core';
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
import { HeadDashboardService } from 'src/app/head-dashboard/_service/head-dashboard.service';
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
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss'],
})
export class RowComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent | undefined;

  public chartOptions: ChartOptions;
  public dataFromDatabase: any;

  constructor(
    private headDashboardService: HeadDashboardService,
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

      // Find the logged-in user's data
      const user = ds.find((teacher: any) => teacher.id === parseInt(userId));
      if (user) {
        // Filter data based on the logged-in user's section and role
        const filteredData = ds.filter(
          (student: any) =>
            student.section === user.section && student.role === 'student'
        );
        this.dataFromDatabase = filteredData;
        console.log(this.dataFromDatabase);

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

        // Update the chart with the new options
        if (this.chart) {
          this.chart.updateOptions(this.chartOptions);
        }
      } else {
        console.error('Logged-in user not found in the dataset');
      }
    });
  }
}
