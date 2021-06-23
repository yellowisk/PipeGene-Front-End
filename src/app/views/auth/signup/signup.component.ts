import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { SignService } from './../sign.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  invalid = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly signService: SignService,
    private readonly router: Router
  ) {
    this.signupForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      orcid: [null],
      github: [null],
    });
  }

  ngOnInit(): void {}

  signup(): void {
    this.signService.signup(this.signupForm.value).subscribe(
      () => this.router.navigate(['/login']),
      (error: HttpErrorResponse) => {
        console.log(error);
        this.invalid = true;
      }
    );
  }

  getControlError(control: string): boolean {
    const formControl = this.signupForm.get(control);
    return formControl.errors && formControl.touched;
  }

  validateForm(): boolean {
    if (this.signupForm.valid) {
      return true;
    }
    this.signupForm.markAllAsTouched();
    return false;
  }
}
