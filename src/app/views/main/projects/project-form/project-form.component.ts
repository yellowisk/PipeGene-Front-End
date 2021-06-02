import { ProjectService } from './../project.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
})
export class ProjectFormComponent implements OnInit {
  projectForm: FormGroup;
  datasetsToUpload: File[] = [];
  editMode:number = -1;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly projectService: ProjectService,
    private readonly router: Router
  ) {
    this.projectForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      datasets: [[], [Validators.required]],
      description: [null],
    });
  }

  ngOnInit(): void {}

  openFileInput(input: any): void {
    input.click();
  }

  saveProject(): void {
    if (this.projectForm.valid) {
      this.projectService.addProject(this.projectForm.value);
      this.router.navigate(['/projects']);
    } else {
      console.log('not valid', this.projectForm.errors);
      this.projectForm.markAsTouched();
    }
  }

  handleFileInput(files: FileList): void {
    Array.from(files).forEach((file: File) => {
      this.datasetsToUpload.push(file);
    });
  }

  removeDataset(index: number): void {
    this.datasetsToUpload.splice(index, 1)
  }
}
