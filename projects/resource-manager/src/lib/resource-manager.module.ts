import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { ResourceManagerComponent } from './resource-manager.component';



@NgModule({
  declarations: [
    ResourceManagerComponent
  ],
  imports: [
    BrowserAnimationsModule,
    MatSliderModule
  ],
  exports: [
    ResourceManagerComponent
  ]
})
export class ResourceManagerModule { }
