import { Router } from '@angular/router';
import { SignService } from './../sign.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  invalid = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly signService: SignService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {}

  login(): void {
    if (!this.validateForm()) {
      return;
    }
    this.signService.login(this.loginForm.value).subscribe(
      (response: Response) => {
        this.authService.initSession(response.headers.get('Authorization'));
        this.router.navigate(['/']);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.invalid = true;
      }
    );
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
