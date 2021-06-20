import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICreateProject, IProject } from 'src/app/interfaces/project.interface';
import { IPipeline } from 'src/app/interfaces/pipeline.interface';

@Injectable({
  providedIn: 'root',
})
export class PipelineService {
  constructor(private http: HttpClient) {}

  createPipeline(
    pipeline: IPipeline,
    projectId: string
  ): Observable<IPipeline> {
    console.log('service', pipeline, projectId);
    return this.http.post<IPipeline>(
      `${environment.baseUrl}/v1/projects/${projectId}/pipelines`,
      pipeline
    );
  }

  listPipelines(projectId: string): Observable<IPipeline[]> {
    projectId = 'f2d6a949-8bb5-4df5-8ca7-e5b8d2292488';
    return this.http.get<IPipeline[]>(`${environment.baseUrl}/v1/projects/${projectId}/pipelines`);
  }
}
