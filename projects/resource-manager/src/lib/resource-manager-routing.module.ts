import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from './projects/projects/projects.component';
import { ResourcesComponent } from './resources/resources/resources.component';

const routes: Routes = [
  { path: 'projects', component: ProjectsComponent },
  { path: 'resources', component: ResourcesComponent },
  { path: '', redirectTo: 'projects', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResourceManagerRoutingModule {}
