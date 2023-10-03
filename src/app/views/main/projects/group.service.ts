import { Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../../environments/environment';
import { IGroupParticipation } from 'src/app/interfaces/group.interface';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) {}

  getAllGroupInvites(): Observable<IGroupParticipation[]>{
    return this.http.get<IGroupParticipation[]>(`${environment.baseUrl}/api/v1/groups/participations`);
  }
}
