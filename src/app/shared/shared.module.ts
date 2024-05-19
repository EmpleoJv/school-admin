import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './ui/table/table.component';
import { SidenavComponent } from './component/sidenav/sidenav.component';
import { HeaderComponent } from './component/header/header.component';

@NgModule({
  declarations: [TableComponent, SidenavComponent, HeaderComponent],
  imports: [CommonModule],
  exports: [SidenavComponent, TableComponent],
})
export class SharedModule {}
