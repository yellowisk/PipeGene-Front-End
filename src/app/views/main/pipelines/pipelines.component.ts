import { ErrorService } from './../../../services/error.service';
import { PipelineService } from './pipeline.service';
import { ProjectService } from '../projects/project.service';
import { IPipeline } from 'src/app/interfaces/pipeline.interface';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorMap } from 'src/app/enums/error-code.enum';
import { Observable } from 'rxjs/.';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-pipelines',
  templateUrl: './pipelines.component.html',
  styleUrls: ['./pipelines.component.scss'],
})
export class PipelinesComponent implements OnInit {
  pipelines: any[] = [];
  pipeline: IPipeline;
  

  constructor(
    private readonly pipelineService: PipelineService,
    private readonly projectService: ProjectService,
    private readonly errorService: ErrorService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.getPipelines();
  }

  getPipelines(): void {
    this.pipelineService.listPipelines().subscribe(
      (response) => {
        this.pipelines = response.filter((pipeline) => pipeline.status !== 'DISABLED');
      },
      (error: HttpErrorResponse) => {
        this.errorService.setError(ErrorMap.get('FAILED_TO_GET'));
      }
    );
  }

  setEditMode(pipeline): void {
    this.router.navigate([`/pipelines/edit/`], {
      queryParams: { id: pipeline.id },
    });
  }

  isAllowed(pipeline): Observable<boolean> {
    return this.projectService.getOneProjectByPipeline(pipeline.id).pipe(
      switchMap((project) => {
        return this.projectService.isOwner(project.id);
      })
    );
  }

  disablePipeline(pipeline): void {
    this.projectService.getOneProjectByPipeline(pipeline.id).subscribe(
      (project) => {
        this.pipelineService.disablePipeline(project.id, pipeline.id).subscribe(
          (response) => {
            console.log(JSON.stringify(response))
            this.getPipelines();
          },
          (error: HttpErrorResponse) => {
            this.errorService.setError(ErrorMap.get('FAILED_TO_DISABLE'));
          }
        );
      })
    
  }

}
