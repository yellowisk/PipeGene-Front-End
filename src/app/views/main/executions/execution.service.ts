import { ICreateExecution, IExecution } from './../../../interfaces/execution.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExecutionService {
  constructor(private readonly http: HttpClient) {}

  createExecution(execution: ICreateExecution, projectId: string): Observable<IExecution> {
    return this.http.post<IExecution>(
      `${environment.baseUrl}/api/v1/projects/${projectId}/executions`,
      execution
    );
  }

  listExecutions(): Observable<IExecution[]> {
    return this.http.get<IExecution[]>(`${environment.baseUrl}/api/v1/users/${sessionStorage.getItem('user_id')}/executions`);
  }


  listProjectExecutions(id: string): Observable<IExecution[]> {
    return this.http.get<IExecution[]>(`${environment.baseUrl}/api/v1/projects/${id}/executions`);
  }
}
