import { ProjectService } from './project.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: any[];

  constructor(private readonly projectService: ProjectService) { }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects() {
    this.projects = this.projectService.listProjects();
  }

}
