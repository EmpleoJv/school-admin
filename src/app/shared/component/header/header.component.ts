import { Component, Input } from '@angular/core';
import { HeaderNameService } from './_service/header-name.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  headerName!: string;
  isMenuVisible = false;

  constructor(private headerService: HeaderNameService) {}

  ngOnInit() {
    this.headerService.headerName$.subscribe((name) => {
      this.headerName = name;
    });
  }

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }
}
