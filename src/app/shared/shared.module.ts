import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './ui/table/table.component';
import { SidenavComponent } from './component/sidenav/sidenav.component';

@NgModule({
  declarations: [TableComponent, SidenavComponent],
  imports: [CommonModule],
  exports: [SidenavComponent, TableComponent],
})
export class SharedModule {}
