import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Partner } from '../models/partner.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class PartnerService {

  constructor(private http: HttpClient) { }

  getPartnersByDistance(lat:number,lon:number,maxdistance:number): Observable<Partner[]> {
    return this.http.get<Partner[]>(environment.apipath +`/api/partners/list/${maxdistance}/${lat}/${lon}`);
  }

}
