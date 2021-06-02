import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  projects: any[] = [];

  constructor() {}

  addProject(project: any): boolean {
    project.id = this.projects.length + 1;
    this.projects.push(project);
    return true;
  }

  listProjects(): any{
    console.log(this.projects);
    return this.projects;
  }

}
