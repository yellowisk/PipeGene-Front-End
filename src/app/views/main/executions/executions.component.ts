import { ErrorService } from './../../../services/error.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IExecution } from './../../../interfaces/execution.interface';
import { ExecutionService } from './execution.service';
import { Component, OnInit } from '@angular/core';
import { ErrorMap } from 'src/app/enums/error-code.enum';

@Component({
  selector: 'app-executions',
  templateUrl: './executions.component.html',
  styleUrls: ['./executions.component.scss'],
})
export class ExecutionsComponent implements OnInit {
  showExecutionsDetails: string;
  executions: IExecution[] = [];

  constructor(
    private readonly executionService: ExecutionService,
    private readonly errorService: ErrorService) {}

  ngOnInit(): void {
    this.getExecutions();
  }

  getExecutions(): any {
    this.executionService.listExecutions().subscribe(
      (response) => {
      this.executions = response;
    },
    (error: HttpErrorResponse) => {
      this.errorService.setError(ErrorMap.get('FAILED_TO_GET'));
    });
  }
}
