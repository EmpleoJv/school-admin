import { Component } from '@angular/core';
import { SidenavService } from './_service/sidenav.service';
import { SecureStorageService } from 'src/app/login/_Auth/secure-storage.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
      constructor(private sidenavService:SidenavService,
                  private secureStorageService: SecureStorageService
      ){}



  ngOnInit(){
    this.employee();
  }

  employee() {
    const timesheetIdString = this.secureStorageService.getItem("userId");
  
    this.sidenavService.getSectionsLeaderboard().subscribe((res: any) => {
      const ds = res.data;
  
      const userArray = ds.filter((user: any) => user.id === timesheetIdString);
  
      if (userArray.length > 0) {
        const userRole = userArray[0].role;

        let dashboardLink = '';
        let leaderboardLink = '';
        if (userRole === 'teacher') {
          dashboardLink = '/teacher-dashboard';
          leaderboardLink = '/teacher-leaderboard';
        } else if (userRole === 'headTeacher') {
          dashboardLink = '/head-dashboard';
          leaderboardLink = '/head-leaderboard';
        }
  
        // Set the side navigation links
        this.setSideNavLink('dashboardLink', dashboardLink);
        this.setSideNavLink('leaderboardLink', leaderboardLink);
  
        
      }
    });
  }
  
  

  setSideNavLink(linkId: string, link: string) {
    const sideNavElement = document.getElementById(linkId);     
  if (sideNavElement) {
    sideNavElement.setAttribute('href', link);
  }
}


}
