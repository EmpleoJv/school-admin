import { Component } from '@angular/core';
import { HeadDashboardService } from '../head-dashboard/_service/head-dashboard.service';
import { SecureStorageService } from '../login/_Auth/secure-storage.service';
import { HeaderNameService } from '../shared/component/header/_service/header-name.service';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.scss'],
})
export class TeacherDashboardComponent {
  constructor(
    private headDashboardService: HeadDashboardService,
    private headerService: HeaderNameService,
    private secureStorageService: SecureStorageService
  ) {}
  ngOnInit() {
    this.headerService.setHeaderName('Teacher Dashboard ');
  }
}
