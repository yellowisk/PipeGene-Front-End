import { AuthService } from 'src/app/services/auth.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  @Output() toggleMenu: EventEmitter<boolean> = new EventEmitter();


  constructor(private readonly authService: AuthService) { }

  ngOnInit(): void {
  }

  toggle(): void {
    this.toggleMenu.emit(true);
  }

  signout(): void{
    this.authService.resetSession();
  }

}
