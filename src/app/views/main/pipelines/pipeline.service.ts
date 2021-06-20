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
    return this.http.post<IPipeline>(
      `${environment.baseUrl}/v1/projects/${projectId}/pipelines`,
      pipeline
    );
  }

  listPipelines(): Observable<IProject[]> {
    return this.http.get<IProject[]>(`${environment.baseUrl}/v1/projects/`);
  }
}
