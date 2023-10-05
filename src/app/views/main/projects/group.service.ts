import { Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../../environments/environment';
import { IGroupParticipation, IGroupParticipationView } from 'src/app/interfaces/group.interface';
import { IUser } from 'src/app/interfaces/auth.interface';
import { Compiler } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) {}

  getAllGroupInvites(): Observable<IGroupParticipationView[]>{
    return this.http.get<IGroupParticipationView[]>(`${environment.baseUrl}/api/v1/groups/participations`);
  }

  getSubmitterUserByGroupParticipation(submitterId: string): Observable<IUser>{
    return this.http.get<IUser>(`${environment.baseUrl}/api/v1/groups/${submitterId}/user`);
  }

  acceptGroupParticipation(id: string): Observable<any> {
    return this.http.patch(`${environment.baseUrl}/api/v1/groups/acceptParticipation/${id}`, {});
  }

  denyGroupParticipation(id: string): Observable<any> {
    return this.http.patch(`${environment.baseUrl}/api/v1/groups/denyParticipation/${id}`, {});
  }
}
