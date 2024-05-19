import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './ui/table/table.component';
import { SidenavComponent } from './component/sidenav/sidenav.component';
import { HeaderComponent } from './component/header/header.component';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [TableComponent, SidenavComponent, HeaderComponent],
  imports: [CommonModule, MaterialModule],
  exports: [SidenavComponent, TableComponent, HeaderComponent],
})
export class SharedModule {}
