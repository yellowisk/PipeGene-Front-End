import { ErrorService } from './../../../services/error.service';
import { PipelineService } from './pipeline.service';
import { IPipeline } from 'src/app/interfaces/pipeline.interface';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorMap } from 'src/app/enums/error-code.enum';

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
    private readonly errorService: ErrorService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.getPipelines();
  }

  getPipelines(): void {
    this.pipelineService.listPipelines().subscribe(
      (response) => {
        this.pipelines = response;
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

}
