import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorMap } from 'src/app/enums/error-code.enum';
import { ErrorService } from 'src/app/services/error.service';
import { SignService } from '../sign.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  editForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly signService: SignService,
    private readonly errorService: ErrorService,
    private readonly router: Router,
    private route: ActivatedRoute
  ) {
    this.editForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      name: [null, [Validators.required]],
      orcid: [null],
      github: [null]
    });
   }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const id = params.id;
      this.signService.getUser(id).subscribe((userResponse) => {
        this.editForm.get('username').setValue(userResponse.username);
        this.editForm.get('name').setValue(userResponse.name);
        this.editForm.get('orcid').setValue(userResponse.orcid);
        this.editForm.get('github').setValue(userResponse.github);
      })
    })
  }

  edit(): void {
    if (!this.validateForm()) {
      return;
    }

    this.route.queryParams.subscribe((params) => {

      this.signService.edit(params.id, this.editForm.value).subscribe(
        () => {
          sessionStorage.setItem('username', this.editForm.get('username').value)
          sessionStorage.setItem('name', this.editForm.get('name').value)
          sessionStorage.setItem('orcid', this.editForm.get('orcid').value)
          sessionStorage.setItem('github', this.editForm.get('github').value)
          this.router.navigate(['/main']);
        },
        (error: HttpErrorResponse) => {
          this.errorService.setError(ErrorMap.get('INVALID_CREDENTIALS'));
        }
      );
     } )
    
  }

  getControlError(control: string): boolean {
    const formControl = this.editForm.get(control);
    return formControl.errors && formControl.touched;
  }

  validateForm(): boolean {
    if (this.editForm.valid) {
      return true;
    }
    this.editForm.markAllAsTouched();
    return false;
  }

}
