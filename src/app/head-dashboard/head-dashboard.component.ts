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
  totalStudents: number = 0;
  bestPlayerName: string = '';
  highestScore: number = 0;

  constructor(
    private headDashboardService: HeadDashboardService,
    private headerService: HeaderNameService,
    private secureStorageService: SecureStorageService
  ) {}

  ngOnInit() {
    this.headerService.setHeaderName('Head Dashboard');
    this.bestPlayer();
  }

  bestPlayer() {
    this.headDashboardService.getAllStudentsData().subscribe((res: any) => {
      const ds = res.data;

      // Filter out non-student roles
      const students = ds.filter((student:any) => student.role === 'student');

      if (students.length > 0) {
        this.totalStudents = students.length;

        // Find the student with the highest total_score
        let highestScoringStudent = students[0]; // Initialize with the first student

        for (let student of students) {
          if (student.total_score > highestScoringStudent.total_score) {
            highestScoringStudent = student;
          }
        }

        this.bestPlayerName = `${highestScoringStudent.first_name} ${highestScoringStudent.last_name}`;
      } else {
        this.totalStudents = 0;
        this.bestPlayerName = 'N/A';
      }
    });
  }

}


