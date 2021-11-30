import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Campaign } from 'src/app/models/campaigns/campaign';
import { map } from 'rxjs/operators';
import { Project } from 'src/app/models/projects/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
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
          });
          return campaign;
        });
      })
    );
  };
}

// campaigns.map(campaign => {
//   campaign.startDate = new Date(campaign.startDate);
//   campaign.projects = campaign.projects.map(project => {
//       project.startDate = new Date(project.startDate);
//       return project;
//   });
//   return campaign;
// })
