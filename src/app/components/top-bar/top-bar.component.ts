import { AuthService } from 'src/app/services/auth.service';
import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  @Output() toggleMenu: EventEmitter<boolean> = new EventEmitter();
  id: string;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
    ) { }

  ngOnInit(): void {
    this.id = sessionStorage.getItem('user_id');
  }

  toggle(): void {
    this.toggleMenu.emit(true);
  }

  signout(): void{
    this.authService.resetSession();
  }

  editUser(): void {
    console.log(this.id)
    this.router.navigate([`/edit`], {
      queryParams: {id: this.id}
    })
  }

}
