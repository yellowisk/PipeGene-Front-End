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
      `${environment.baseUrl}/v1/projects/${projectId}/executions`,
      execution
    );
  }

  listExecutions(): Observable<IExecution[]> {
    return this.http.get<IExecution[]>(`${environment.baseUrl}/v1/users/78cec5db-6396-4fd9-803f-1fd469d76330/executions`);
  }


  listProjectExecutions(id: string): Observable<IExecution[]> {
    return this.http.get<IExecution[]>(`${environment.baseUrl}/v1/projects/${id}/executions`);
  }
}
