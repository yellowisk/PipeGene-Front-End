import { PipelineService } from './pipeline.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pipelines',
  templateUrl: './pipelines.component.html',
  styleUrls: ['./pipelines.component.scss']
})
export class PipelinesComponent implements OnInit {
  pipelines: any[] = [];
  constructor(
    private readonly pipelineService: PipelineService
  ) { }

  ngOnInit(): void {
    this.getPipelines();
  }

  getPipelines(): void {
    this.pipelineService.listPipelines('').subscribe(response => {
      this.pipelines = response;
    });
  }

}
