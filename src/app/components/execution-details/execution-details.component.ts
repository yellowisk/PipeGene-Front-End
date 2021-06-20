import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-execution-details',
  templateUrl: './execution-details.component.html',
  styleUrls: ['./execution-details.component.scss'],
})
export class ExecutionDetailsComponent implements OnInit {
  @Input() execution;

  constructor() {}

  ngOnInit(): void {}

  getIconStatus(item: any): string {
    switch (item.state) {
      case 'SUCCESS':
        return 'fas fa-check-circle';
      case 'IN_PROGRESS':
        return 'fas fa-clock';
      case 'NOT_EXECUTED':
        return 'fas fa-pause-circle';
      case 'ERROR':
        return 'fas fa-exclamation-circle';
    }
  }

  getStatus(item: any): string {
    switch (item.state) {
      case 'SUCCESS':
        return 'success';
      case 'IN_PROGRESS':
        return 'in-progress';
      case 'NOT_EXECUTED':
        return 'n-executed';
      case 'ERROR':
        return 'error';
    }
  }
}
