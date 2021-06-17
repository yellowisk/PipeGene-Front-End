import { ExecutionService } from './execution.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-executions',
  templateUrl: './executions.component.html',
  styleUrls: ['./executions.component.scss']
})
export class ExecutionsComponent implements OnInit {
  executions: any[] = [];

  constructor(
    private readonly executionService: ExecutionService
  ) { }

  ngOnInit(): void {
    //this.getExecutions();
  }

  getExecutions(): any {
    this.executionService.listExecutions().subscribe(response => {
      this.executions = response;
      console.log(this.executions);
    });
  }

}
