import { Component } from '@angular/core';
import { Campaign } from './models/campaigns/campaign';
import { Resource } from './models/resources/resource';
import { ProjectsService } from './services/projects/projects.service';
import { ResourcesService } from './services/resources/resources.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'resource-management-workspace';

  projects: Campaign[] = [];
  resources: Resource[] = [];

  constructor(
    private projectsService: ProjectsService,
    private resourceService: ResourcesService
  ) {
    this.projectsService
      .getAllProjects()
      .subscribe((responseProjects: Campaign[]) => {
        this.projects = responseProjects;
        console.log(responseProjects);
      });
    this.resourceService
      .getAllResource()
      .subscribe((responseResources: Resource[]) => {
        this.resources = responseResources;
      });
  }
}
