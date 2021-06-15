import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  today: string;
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
      url: '/projects',
    },
    {
      name: 'Serviços',
      icon: 'fas fa-cogs',
      url: '/services',
    },
  ];

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
   this.getToday();
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
