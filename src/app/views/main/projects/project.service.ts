import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICreateProject, IProject } from 'src/app/interfaces/project.interface';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  addProject(project: ICreateProject, files: File[]): Observable<IProject> {
    const formData = new FormData();
    formData.append('name', project.name);
    formData.append('description', project.description);
    files.forEach((file) => formData.append('files', file, file.name));

    return this.http.post<IProject>(
      `${environment.baseUrl}/api/v1/projects/`,
      formData
    );
  }

  listProjects(): Observable<IProject[]> {
    return this.http.get<IProject[]>(`${environment.baseUrl}/api/v1/projects/`);
  }

  deleteProject(id: string): void {}

  getOneProject(id: string): Observable<IProject> {
    return this.http.get<IProject>(`${environment.baseUrl}/api/v1/projects/${id}`);
  }

  saveEdit(project: IProject): Observable<IProject> {
    return this.http.put<IProject>(
      `${environment.baseUrl}/api/v1/projects/${project.id}`,
      {
        name: project.name,
        description: project.description
      }
    );
  }
}
