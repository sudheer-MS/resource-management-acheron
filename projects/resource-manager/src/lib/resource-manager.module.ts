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
<<<<<<< HEAD
=======
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
>>>>>>> 4518466c3bad14fbe82f25be8490e724f9ec434f

@NgModule({
  declarations: [
    ResourceManagerComponent,
    SidebarComponent,
    HeaderComponent,
    CalendarComponent,
    FilterComponent,
    ResourceCardComponent,
    SearchBarComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    MatExpansionModule,
<<<<<<< HEAD
=======
    MatCheckboxModule,
>>>>>>> 4518466c3bad14fbe82f25be8490e724f9ec434f
    MatButtonToggleModule,
    MatSliderModule,
  ],
  exports: [ResourceManagerComponent],
})
export class ResourceManagerModule {}
