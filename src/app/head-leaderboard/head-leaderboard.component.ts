import { Component, Input } from '@angular/core';
import { HeaderNameService } from '../shared/component/header/_service/header-name.service';
import { SecureStorageService } from '../login/_Auth/secure-storage.service';
import { TeacherLeaderboardModel } from '../model/teacher-leaderboard.model';
import { MatTableDataSource } from '@angular/material/table';
import { HeadLeaderboardService } from './_service/head-leaderboard.service';

@Component({
  selector: 'app-head-leaderboard',
  templateUrl: './head-leaderboard.component.html',
  styleUrls: ['./head-leaderboard.component.scss'],
})
export class HeadLeaderboardComponent {
  @Input() headerName: String = 'Leaderboard';
  studentSections: any;

  constructor(
    private headLeaderboardService: HeadLeaderboardService,
    private headerService: HeaderNameService,
    private secureStorageService: SecureStorageService
  ) {}

  displayedColumns: string[] = [
    'id_number',
    'first_name',
    'last_name',
    'section',
    'chapter_finish',
    'total_score',
    'remarks',
  ];

  displayedColumns2: string[] = [
    'id_number',
    'first_name',
    'last_name',
    'section',
  ];

  dataSource = new MatTableDataSource<TeacherLeaderboardModel>();
  dataSource2 = new MatTableDataSource<TeacherLeaderboardModel>();

  ngOnInit() {
    this.headerService.setHeaderName("All Section's Leaderboard");
    this.loadTeacherLeaderboard();
    this.loadSelectSection();
    this.loadTeacherTable();
  }

  loadTeacherTable() {
    const userId = this.secureStorageService.getItem('userId');
    console.log(userId);
    this.headLeaderboardService
      .getAllStudentsLeaderboard()
      .subscribe((res: any) => {
        const ds = res.data;
        const userType = ds.find((teacher: any) => teacher.id === userId);
        const filteredData = ds.filter(
          (student: any) => student.role === 'teacher'
        );
        const sortedData = filteredData.sort(
          (a: TeacherLeaderboardModel, b: TeacherLeaderboardModel) =>
            b.total_score - a.total_score
        );

        this.dataSource2 = new MatTableDataSource<TeacherLeaderboardModel>(
          sortedData
        );
      });
  }
  loadTeacherLeaderboard() {
    const userId = this.secureStorageService.getItem('userId');
    console.log(userId);
    this.headLeaderboardService
      .getAllStudentsLeaderboard()
      .subscribe((res: any) => {
        const ds = res.data;
        const userType = ds.find((teacher: any) => teacher.id === userId);
        const filteredData = ds.filter(
          (student: any) => student.role === 'student'
        );
        const sortedData = filteredData.sort(
          (a: TeacherLeaderboardModel, b: TeacherLeaderboardModel) =>
            b.total_score - a.total_score
        );

        this.dataSource = new MatTableDataSource<TeacherLeaderboardModel>(
          sortedData
        );
      });
  }

  loadSelectSection() {
    this.headLeaderboardService.getAllSection().subscribe((res: any) => {
      const ds = res.data;
      this.studentSections = ds;
    });
  }
  applySelectFilter(event: any) {
    if (event == null) {
      this.loadTeacherLeaderboard();
    } else {
      const weekFilterValue = event.toString();
      this.dataSource.filterPredicate = (
        data: TeacherLeaderboardModel,
        filter: string
      ) => {
        return data.section.toString().toLowerCase() === filter;
      };
      this.dataSource.filter = weekFilterValue.trim().toLowerCase();
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
