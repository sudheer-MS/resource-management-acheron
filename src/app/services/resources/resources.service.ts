import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Resource } from 'src/app/models/resources/resource';

@Injectable({
  providedIn: 'root',
})
export class ResourcesService {
  baseUrl = '/api';

  constructor(private _http: HttpClient) {}

  getAllResource = (): Observable<Resource[]> => {
    const url = this.baseUrl + '/resources/without-task';
    return this._http.get<Resource[]>(url).pipe(
      map((resources) => {
        resources.map((resource: Resource) => {
          resource.availability.startDate = new Date(resource.availability.startDate);
          resource.availability.endDate = new Date(resource.availability.endDate);
          return resource;
        });
        return resources;
      })
    );
  };
}
