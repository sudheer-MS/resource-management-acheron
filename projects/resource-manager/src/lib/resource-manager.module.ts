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
    MatToolbarModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatSliderModule,
  ],
  exports: [ResourceManagerComponent],
})
export class ResourceManagerModule {}
