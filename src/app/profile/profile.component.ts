import { Component } from '@angular/core';
import { ProfileService } from './_service/teacher-leaderbaord.service';
import { SecureStorageService } from '../login/_Auth/secure-storage.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  profilData: any[] = [];

    firstName: string = "";
    lastName: string = "";
  

  constructor(private profileService: ProfileService,
              private secureStorageService: SecureStorageService
  ){}

  ngOnInit(){
    this.profile();

    console.log(this.profilData)
  }


  profile() {
    const timesheetIdString = this.secureStorageService.getItem("userId");

    

      const timesheetId = +timesheetIdString;

      this.profileService.getSectionsLeaderboard().subscribe((res: any) => {
        const ds = res.data;
        
        const userArray = ds.filter((user: any) => user.id === timesheetIdString);
      
        if(userArray.length > 0) {
          this.profilData = userArray;
        }
      

        
      });
    
  }
}
