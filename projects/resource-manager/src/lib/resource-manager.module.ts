import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { ResourceManagerComponent } from './resource-manager.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FilterComponent } from './filter/filter.component';
import { ResourceCardComponent } from './resource-card/resource-card.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';
import { DisplayFieldsComponent } from './display-fields/display-fields.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { TaskAllocationComponent } from './task-allocation/task-allocation.component';
import { EmployeeAllocationComponent } from './employee-allocation/employee-allocation.component';
import { ProjectsComponent } from './projects/projects/projects.component';
@NgModule({
  declarations: [
    ResourceManagerComponent,
    SidebarComponent,
    HeaderComponent,
    CalendarComponent,
    FilterComponent,
    ResourceCardComponent,
    SearchBarComponent,
    DisplayFieldsComponent,
    ProjectsComponent,
    TaskAllocationComponent,
    EmployeeAllocationComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatSelectModule,
    MatSliderModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
  ],
  exports: [ResourceManagerComponent],
})
export class ResourceManagerModule {}
