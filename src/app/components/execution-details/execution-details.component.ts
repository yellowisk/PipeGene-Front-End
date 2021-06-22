import { IExecution } from "./../../interfaces/execution.interface";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-execution-details",
  templateUrl: "./execution-details.component.html",
  styleUrls: ["./execution-details.component.scss"],
})
export class ExecutionDetailsComponent implements OnInit {
  @Output() refresh: EventEmitter<any> = new EventEmitter();

  @Input() executions: IExecution[];
  showExecutionsDetails = null;

  constructor() {}

  ngOnInit(): void {}

  getIconStatus(status: string): string {
    switch (status) {
      case "SUCCESS":
        return "fas fa-check-circle";
      case "DONE":
        return "fas fa-check-circle";
      case "IN_PROGRESS":
        return "fas fa-clock";
      case "WAITING":
        return "fas fa-pause-circle";
      case "NOT_EXECUTED":
        return "fas fa-pause-circle";
      case "ERROR":
        return "fas fa-exclamation-circle";
    }
  }

  getStatus(item: any): string {
    switch (item.state) {
      case "SUCCESS":
        return "success";
      case "IN_PROGRESS":
        return "in-progress";
      case "NOT_EXECUTED":
        return "n-executed";
      case "ERROR":
        return "error";
    }
  }

  getHeaderStatus(item: any): string {
    switch (item) {
      case "DONE":
        return "h-success";
      case "IN_PROGRESS":
        return "h-in-progress";
      case "WAITING":
        return "h-n-executed";
      case "ERROR":
        return "h-error";
    }
  }

  showDetails(id: string): void {
    this.showExecutionsDetails = this.showExecutionsDetails === id ? null : id;
  }

  refreshExecutions() {
    this.refresh.emit();
  }

}
