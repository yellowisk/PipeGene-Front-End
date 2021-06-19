import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  showMenu = true;

  constructor() { }

  ngOnInit(): void {
    if (window.matchMedia("(min-width: 768px)").matches) {
      this.showMenu = true
    } else {
      this.showMenu = false
    }
  }

  toggleMenu(event: any) {
    this.showMenu = !this.showMenu;
  }

}
