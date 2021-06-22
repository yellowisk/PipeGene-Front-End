import { Router } from '@angular/router';
import { SignService } from './../sign.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly signService: SignService,
    private readonly authService: AuthService,
    private readonly router: Router) {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    })
   }

  ngOnInit(): void {
  }

  login() {
    if (!this.validateForm()) return;
    this.signService.login(this.loginForm.value).subscribe(
      (response) => {
        console.log(response)
        sessionStorage.setItem('user_id', "teste");
        this.authService.initSession("teste");
        this.router.navigate(['/']);
      },
      (error: HttpErrorResponse) => {
        console.log(error)
      });
  }

  getControlError(control: string): boolean {
    const formControl = this.loginForm.get(control);
    return formControl.errors && formControl.touched;
  }

  validateForm(): boolean {
    if (this.loginForm.valid) {
      return true;
    }
    this.loginForm.markAllAsTouched();
    return false;
  }

}
