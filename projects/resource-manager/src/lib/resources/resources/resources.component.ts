import { Component, Input, OnInit } from '@angular/core';
import { Resource } from '../../models/resources/resource';
import { Campaign } from '../../models/campaigns/campaign';
@Component({
  selector: 'lib-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss'],
})
export class ResourcesComponent implements OnInit {
  @Input() projects: Campaign[] = [];

  map = new Map<number, Campaign[]>();
  resources: number[] = [];
  constructor() {}

  taskList: any

  ngOnInit(): void {
    // this.projects.map((campaign) =>
    //   campaign.projects.map((project) =>
    //     project.tasks.map((task) => {
    //       if (task.resource != null) {
    //         let campaignArray = [campaign];
    //         this.map.set(task.resource.resourceId, campaignArray);
    //         console.log(this.map);
    //       }
    //     })
    //   )
    // );

  //   for(let i=0;i<this.projects.length-1;i++){
  //     let campaign= this.projects[i].projects.map(project=>{ return project.tasks});
  //     let campaignother= this.projects[i+1].projects.map(project=>{ return project.tasks});;
  //     this.taskList.push(campaign)
  //     this.taskList.push(campaignother)
  //   }
  //   console.log(this.taskList);
  // }
}
}
