import { ErrorService } from './../../../services/error.service';
import { PipelineService } from './pipeline.service';
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
  constructor(
    private readonly pipelineService: PipelineService,
    private readonly errorService: ErrorService
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
}
