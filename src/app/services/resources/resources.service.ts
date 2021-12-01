import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resource } from 'src/app/models/resources/resource';

@Injectable({
  providedIn: 'root',
})
export class ResourcesService {
  baseUrl = '/api';

  constructor(private _http: HttpClient) {}

  getAllResource = (): Observable<Resource[]> => {
    const url = this.baseUrl + '/resources';
    return this._http.get<Resource[]>(url);
  };
}
