import { IExecution } from './../../../interfaces/execution.interface';
import { ExecutionService } from './execution.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-executions',
  templateUrl: './executions.component.html',
  styleUrls: ['./executions.component.scss'],
})
export class ExecutionsComponent implements OnInit {
   showExecutionsDetails: string;
  executions: IExecution[] = [];

  constructor(private readonly executionService: ExecutionService) {}

  ngOnInit(): void {
    this.getExecutions();
  }

  getExecutions(): any {
    this.executionService.listExecutions().subscribe((response) => {
      this.executions = response;
    });
  }

  showDetails(id: string): void {
    this.showExecutionsDetails = this.showExecutionsDetails === id ? null : id;
  }

  getIconStatus(item: any): string {
    switch (item) {
      case 'DONE':
        return 'fas fa-check-circle';
      case 'IN_PROGRESS':
        return 'fas fa-clock';
      case 'WAITING':
        return 'fas fa-pause-circle';
      case 'ERROR':
        return 'fas fa-exclamation-circle';
    }
  }

  getStatus(item: any): string {
    switch (item) {
      case 'DONE':
        return 'success';
      case 'IN_PROGRESS':
        return 'in-progress';
      case 'WAITING':
        return 'n-executed';
      case 'ERROR':
        return 'error';
    }
  }
}
