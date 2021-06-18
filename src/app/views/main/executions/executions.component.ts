import { IExecution } from './../../../interfaces/execution.interface';
import { ExecutionService } from './execution.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-executions',
  templateUrl: './executions.component.html',
  styleUrls: ['./executions.component.scss'],
})
export class ExecutionsComponent implements OnInit {
  operation = {
    params: [
      {
        type: 'text',
        name: 'Columns',
        key: 'columns',
        example: 'Hugo_Symbol, Chromosome',
      },
      {
        type: 'text',
        name: 'TestOne',
        key: 'testOne',
        example: 'Hugo_Symbol, Chromosome',
      },
      {
        type: 'text',
        name: 'Teste two',
        key: 'testTwo',
        example: 'Hugo_Symbol, Chromosome',
      },
    ],
  };

  showExecutionsDetails: string;
  executions: IExecution[] = [
    {
      id: '1',
      pipeline: {
        id: 'string',
        description: 'string',

        steps: [
          {
            id: 'string',
            provider: {
              name: 'string?',
            },
            inputType: 'string',
            outputType: 'string',
            state: 'string',
            params: {
              key: 'any',
            },
          },
        ],
      },
      dataset: {
        id: 'string',
        filename: 'string',
      },
      description: 'string',
      status: 'ERROR',
      executionResult: 'string?',
      errorMessage: '',
    },
    {
      id: '2',
      pipeline: {
        id: 'string',
        description: 'string',

        steps: [
          {
            id: 'string',
            provider: {
              name: 'string?',
            },
            inputType: 'string',
            outputType: 'string',
            state: 'string',
            params: {
              key: 'any',
            },
          },
        ],
      },
      dataset: {
        id: 'string',
        filename: 'string',
      },
      description: 'string',
      status: 'DONE',
      executionResult: 'string?',
      errorMessage: '',
    },
  ];

  constructor(private readonly executionService: ExecutionService) {}

  ngOnInit(): void {
    // this.getExecutions();
  }

  getExecutions(): any {
    this.executionService.listExecutions().subscribe((response) => {
      this.executions = response;
      console.log(this.executions);
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
