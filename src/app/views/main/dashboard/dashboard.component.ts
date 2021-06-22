import { ExecutionService } from './../executions/execution.service';
import { IExecution } from './../../../interfaces/execution.interface';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  today: string;
  username: string;
  executions: IExecution[] = [];
  options: any[] = [
    {
      name: 'Projetos',
      icon: 'far fa-folder-open',
      url: '/projects',
    },
    {
      name: 'Pipelines',
      icon: 'fas fa-stream',
      url: '/pipelines',
    },
    {
      name: 'Execuções',
      icon: 'fas fa-tasks',
      url: '/executions',
    },
    {
      name: 'Serviços',
      icon: 'fas fa-cogs',
      url: '/services',
    },
  ];

  constructor(
    private readonly router: Router,
    private readonly executionService: ExecutionService
  ) {}

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username');
    this.getExecutions();
    this.getToday();
  }

  getExecutions(): any {
    console.log('oi');
    this.executionService.listExecutions().subscribe((response) => {
      this.executions = response;
    });
  }

  getToday(): void {
    const daysOfWeek = [
      'Domingo',
      'Segunda-feira',
      'Terça-feira',
      'Quarta-feira',
      'Quinta-feira',
      'Sexta-feira',
      'Sábado',
    ];
    const date = new Date();
    this.today = `${daysOfWeek[date.getDay()]}`;
  }

  redirect(path: string): void {
    this.router.navigate([path]);
  }
}
