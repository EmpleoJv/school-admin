import { Component } from '@angular/core';
import { TeacherLeaderboardModel } from '../model/teacher-leaderboard.model';
import { MatTableDataSource } from '@angular/material/table';
import { TeacherLeaderbaordService } from './_service/teacher-leaderbaord.service';
@Component({
  selector: 'app-teacher-leaderboard',
  templateUrl: './teacher-leaderboard.component.html',
  styleUrls: ['./teacher-leaderboard.component.scss'],
})
export class TeacherLeaderboardComponent {
  constructor(private teacherLeaderbaordService: TeacherLeaderbaordService) {}
  displayedColumns: string[] = [
    'id_number',
    'first_name',
    'last_name',
    'email',
    'section',
    'chapter_finish',
    'total_score',
  ];

  dataSource = new MatTableDataSource<TeacherLeaderboardModel>();

  ngOnInit() {
    this.loadTeacherLeaderboard();
  }

  loadTeacherLeaderboard() {
    this.teacherLeaderbaordService
      .getSectionsLeaderboard()
      .subscribe((res: any) => {
        const ds = res.data;
        const filteredData = ds.filter(
          (student: any) => student.section === 'mangga'
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
