import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pipelines',
  templateUrl: './pipelines.component.html',
  styleUrls: ['./pipelines.component.scss']
})
export class PipelinesComponent implements OnInit {
  pipelines: any[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
