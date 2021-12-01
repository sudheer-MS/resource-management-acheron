import { Component } from '@angular/core';
import { Campaign } from './models/campaigns/campaign';
import { ProjectsService } from './services/projects/projects.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'resource-management-workspace';
  // projects: Object[] = [
  //   {
  //     campaignName: 'Campaign A',
  //     startDate: new Date(2021, 10, 6),
  //     endDate: new Date(2021, 10, 26),
  //     name: 'John',
  //     priority: 'HIGH',
  //     projectList: [
  //       {
  //         projectName: 'Project A',
  //         startDate: new Date(2021, 10, 6),
  //         endDate: new Date(2021, 10, 26),
  //         name: 'Andrus',
  //         priority: 'LOW',
  //         taskList: [
  //           {
  //             taskName: 'Task A',
  //             startDate: new Date(2021, 10, 6),
  //             endDate: new Date(2021, 10, 26),
  //             name: 'Riya',
  //             priority: 'Low',
  //           },
  //           {
  //             taskName: 'Task AB',
  //             startDate: new Date(2021, 10, 6),
  //             endDate: new Date(2021, 10, 26),
  //             name: 'Riya',
  //             priority: 'Low',
  //           },
  //         ],
  //       },
  //       {
  //         projectName: 'Project AB',
  //         startDate: new Date(2021, 10, 6),
  //         endDate: new Date(2021, 10, 26),
  //         name: 'Andrus',
  //         priority: 'LOW',
  //         taskList: [
  //           {
  //             taskName: 'Task AB',
  //             startDate: new Date(2021, 10, 6),
  //             endDate: new Date(2021, 10, 26),
  //             name: 'Riya',
  //             priority: 'Low',
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     campaignName: 'Campaign B',
  //     startDate: new Date(2021, 11, 6),
  //     endDate: new Date(2021, 11, 26),
  //     name: 'John',
  //     priority: 'HIGH',
  //     projectList: [
  //       {
  //         projectName: 'Project B',
  //         startDate: new Date(2021, 11, 6),
  //         endDate: new Date(2021, 11, 26),
  //         name: 'Andrus',
  //         priority: 'LOW',
  //         taskList: [
  //           {
  //             taskName: 'Task B',
  //             startDate: new Date(2021, 11, 6),
  //             endDate: new Date(2021, 11, 26),
  //             name: 'Riya',
  //             priority: 'Low',
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     campaignName: 'Campaign C',
  //     startDate: new Date(2021, 10, 20),
  //     endDate: new Date(2022, 11, 26),
  //     name: 'John',
  //     priority: 'HIGH',
  //     projectList: [
  //       {
  //         projectName: 'Project A',
  //         startDate: new Date(2021, 10, 20),
  //         endDate: new Date(2021, 10, 26),
  //         name: 'Andrus',
  //         priority: 'LOW',
  //         taskList: [
  //           {
  //             taskName: 'Task A',
  //             startDate: new Date(2021, 10, 20),
  //             endDate: new Date(2021, 10, 26),
  //             name: 'Riya',
  //             priority: 'Low',
  //           },
  //           {
  //             taskName: 'Task AB',
  //             startDate: new Date(2021, 10, 20),
  //             endDate: new Date(2021, 10, 26),
  //             name: 'Riya',
  //             priority: 'Low',
  //           },
  //         ],
  //       },
  //       {
  //         projectName: 'Project AB',
  //         startDate: new Date(2021, 10, 20),
  //         endDate: new Date(2021, 10, 26),
  //         name: 'Andrus',
  //         priority: 'LOW',
  //         taskList: [
  //           {
  //             taskName: 'Task AB',
  //             startDate: new Date(2021, 10, 20),
  //             endDate: new Date(2021, 10, 26),
  //             name: 'Riya',
  //             priority: 'Low',
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // ];

  projects: Campaign[] = [];
  resources: Object[] = [];

  constructor(private projectsService: ProjectsService) {
    this.projectsService
      .getAllProjects()
      .subscribe((responseProjects: Campaign[]) => {
        this.projects = responseProjects;
      });
  }
}
