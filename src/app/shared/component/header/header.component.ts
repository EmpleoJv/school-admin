import { Component, Input } from '@angular/core';
import { HeaderNameService } from './_service/header-name.service';
import { SecureStorageService } from 'src/app/login/_Auth/secure-storage.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  headerName!: string;
  isMenuVisible = false;

  constructor(private headerService: HeaderNameService,
              private secureStorageService: SecureStorageService,
              private router: Router
  ) {}

  ngOnInit() {
    this.headerService.headerName$.subscribe((name) => {
      this.headerName = name;
    });
  }

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }

  logoutFunction(){
    this.secureStorageService.removeItem('authToken');
    this.secureStorageService.removeItem('userId');
    this.secureStorageService.removeItem('role');
    }

}
