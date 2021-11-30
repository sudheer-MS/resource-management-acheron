import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { Campaign } from 'projects/resource-manager/src/lib/models/campaigns/campaign';
import { Observable } from 'rxjs';
=======
import { Observable } from 'rxjs';
import { Campaign } from 'src/app/models/campaigns/campaign';
import { map } from 'rxjs/operators';
import { Project } from 'src/app/models/projects/project';
>>>>>>> 925f043300a4671f568d2bfc0e9fe4bbf55970d4

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
<<<<<<< HEAD
  constructor() {}
=======
  private BASEURL: string = '/api';

  constructor(private httpClient: HttpClient) {}

  getAllProjects = (): Observable<Campaign[]> => {
    const url = this.BASEURL + '/campaignVO';
    return this.httpClient.get<Campaign[]>(url).pipe(
      map((campaigns) => {
        return campaigns.map((campaign) => {
          campaign.startDate = new Date(campaign.startDate);
          campaign.endDate = new Date(campaign.endDate);
          campaign.projects.map((project) => {
            project.startDate = new Date(project.startDate);
            project.endDate = new Date(project.endDate);
            project.tasks.map((task) => {
              task.startDate = new Date(task.startDate);
              task.endDate = new Date(task.endDate);
              return task;
            });
            return project;
          });
          return campaign;
        });
      })
    );
  };
>>>>>>> 925f043300a4671f568d2bfc0e9fe4bbf55970d4
}

// campaigns.map(campaign => {
//   campaign.startDate = new Date(campaign.startDate);
//   campaign.projects = campaign.projects.map(project => {
//       project.startDate = new Date(project.startDate);
//       return project;
//   });
//   return campaign;
// })
