import { IUser } from './../../../../interfaces/auth.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { ProjectService } from './../project.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgModel, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorService } from 'src/app/services/error.service';
import { ErrorMap } from 'src/app/enums/error-code.enum';



@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
})
export class ProjectFormComponent implements OnInit {
  projectForm: FormGroup;
  datasetsToUpload: any[] = [];
  editMode: string = null
  users: IUser[] = [];
  selectedUsersList: IUser[] = [];
  searchQuery: string = '';
  groupId: string;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly projectService: ProjectService,
    private readonly errorService: ErrorService,
    private readonly router: Router,
    private route: ActivatedRoute
  ) {
    this.projectForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required]],
      datasets: [[], [Validators.required]],
      users: [this.selectedUsersList],  
      description: [null],
    });

    this.route.queryParams.subscribe((params) => {
      if (params.id) {
        this.editMode = params.id;
        this.setEditMode(params.id);
      }
    });
  }

  get selectedUsers(): IUser[] {
    return this.selectedUsersList;
  }

  get unselectedUsers(): IUser[] {
    return this.users.filter(user => !this.selectedUsersList.some(selectedUser => selectedUser.username === user.username));
  }

  ngOnInit(): void {}

  openFileInput(input: any): void {
    input.click();
  }

  toggleUserSelection(user: IUser) {
    const username = user.username;
    const index = this.selectedUsersList.findIndex(selectedUser => selectedUser.username === username);
    if (index !== -1) {
      this.selectedUsersList.splice(index, 1);
    } else {
      this.selectedUsersList.push(user);
    }
  }

  onInputChange(value: string): void {
    this.searchQuery = value;
  }

  saveProject(): void {
    if (!this.validateForm()) { return; }
    if (this.editMode) {
      console.log(this.projectForm)
      this.projectService.saveEdit(this.projectForm.value).subscribe(
        () => {
          this.router.navigate(['/projects']);
        },
        (error: HttpErrorResponse) => {
          this.errorService.setError(ErrorMap.get('FAILED_TO_POST'));
        }
      );
    } else {
      this.projectService
        .addProject(this.projectForm.value, this.datasetsToUpload)
        .subscribe(
          () => {
            this.router.navigate(['/projects']);
          },
          (error: HttpErrorResponse) => {
            this.errorService.setError(ErrorMap.get('FAILED_TO_POST'));
          }
        );
    }
  }

  handleFileInput(files: FileList): void {
    Array.from(files).forEach((file: File) => {
      this.datasetsToUpload.push(file);
    });
  }

  removeDataset(index: number): void {
    this.datasetsToUpload.splice(index, 1);
  }

  getUsers(nameOrEmail: String): void{
    this.projectService.getAllUserByNameOrEmail(nameOrEmail).subscribe(response => {
      this.users = response;
    });
    if (nameOrEmail == ""){
      this.users = [];
    }
  }

  getSelectedUsers(id: string): void {
    this.projectService.getAllPendingOrAcceptedUsersInProject(id).subscribe(response => {
      this.selectedUsersList = response;
      this.projectForm.get('users').setValue(response)
    })
  }

  setEditMode(id: string): void {
    this.projectService.getOneProject(id).subscribe((response) => {
      this.projectForm.get('id').setValue(response.id);
      this.projectForm.get('name').setValue(response.name);
      this.projectForm.get('datasets').setValue(response.datasets);
      this.projectForm.get('description').setValue(response.description);
      this.getSelectedUsers(response.groupId);
      this.groupId = response.groupId
      this.datasetsToUpload = response.datasets.map((file) => ({
        name: file.filename,
      }));
    }); 
  }

  getControlError(control: string): boolean {
    const formControl = this.projectForm.get(control);
    return formControl.errors && formControl.touched;
  }

  validateForm(): boolean {
    if (this.projectForm.valid) {
      return true;
    }
    this.projectForm.markAllAsTouched();
    return false;
  }

  
}


