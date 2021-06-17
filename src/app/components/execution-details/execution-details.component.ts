import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-execution-details",
  templateUrl: "./execution-details.component.html",
  styleUrls: ["./execution-details.component.scss"],
})
export class ExecutionDetailsComponent implements OnInit {
  execution = {
    steps: [
      {
        id: "string",
        provider: {
          name: "Jorge Service",
        },
        state: "SUCCESS",
        params: {
          key: "any",
        },
      },
      {
        id: "string",
        provider: {
          name: "Jorge Service",
        },
        state: "IN_PROGRESS",
        params: {
          key: "IN_PROGRESS",
        },
      },
      {
        id: "string",
        provider: {
          name: "Jorge Service",
        },
        state: "NOT_EXECUTED",
        params: {
          key: "NOT_EXECUTED",
        },
      },
      {
        id: "string",
        provider: {
          name: "Jorge Service",
        },
        state: "ERROR",
        params: {
          key: "ERROR",
        },
      },
    ],
  };

  constructor() {}

  ngOnInit(): void {}

  getIconStatus(item: any) {
    switch (item.state) {
      case "SUCCESS":
        return "fas fa-check-circle";
      case "IN_PROGRESS":
        return "fas fa-clock";
      case "NOT_EXECUTED":
        return "fas fa-pause-circle";
      case "ERROR":
        return "fas fa-exclamation-circle";
    }
  }

  getStatus(item: any) {
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
}
