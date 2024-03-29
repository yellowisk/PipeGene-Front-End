import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IExportPipeline, IPipeline, ICreatePipeline } from 'src/app/interfaces/pipeline.interface';

@Injectable({
  providedIn: 'root',
})
export class PipelineService {
  constructor(private http: HttpClient) {}

  createPipeline(
    projectId: string,
    pipeline: ICreatePipeline
  ): Observable<ICreatePipeline> {
    return this.http.post<IPipeline>(
      `${environment.baseUrl}/api/v1/projects/${projectId}/pipelines`,
      pipeline
    );
  }

  exportPipeline(
    exportingProjectId: string,
    pipelineId: string,
    importingProjectId: IExportPipeline
  ): Observable<IPipeline> {
    return this.http.post<IPipeline>(
      `${environment.baseUrl}/api/v1/projects/${exportingProjectId}/pipelines/${pipelineId}/clone`,
      importingProjectId
    )
  }

  getOnePipeline(
    projectId: string, 
    pipelineId: string): Observable<IPipeline> {
    return this.http.get<IPipeline>(`${environment.baseUrl}/api/v1/projects/${projectId}/pipelines/${pipelineId}`);
  }

  listPipelines(): Observable<IPipeline[]> {
    return this.http.get<IPipeline[]>(`${environment.baseUrl}/api/v1/users/${sessionStorage.getItem('user_id')}/pipelines`);
  }

  listProjectPipelines(projectId: string): Observable<IPipeline[]> {
    return this.http.get<IPipeline[]>(`${environment.baseUrl}/api/v1/projects/${projectId}/pipelines`);
  }

  editPipeline(
    projectId: string,
    pipelineId: string,
    pipeline: IPipeline
  ): Observable<IPipeline> {
    return this.http.patch<IPipeline>(
      `${environment.baseUrl}/api/v1/projects/${projectId}/pipelines/${pipelineId}`,
      pipeline);
  }

  disablePipeline(
    projectId: string,
    pipelineId: string): Observable<IPipeline> {
    return this.http.patch<IPipeline>(`${environment.baseUrl}/api/v1/projects/${projectId}/pipelines/${pipelineId}/disable`,
    {});
  }

}