"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProjectFormComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var error_code_enum_1 = require("src/app/enums/error-code.enum");
var ProjectFormComponent = /** @class */ (function () {
    function ProjectFormComponent(formBuilder, projectService, errorService, router, route) {
        var _this = this;
        this.formBuilder = formBuilder;
        this.projectService = projectService;
        this.errorService = errorService;
        this.router = router;
        this.route = route;
        this.datasetsToUpload = [];
        this.editMode = null;
        this.projectForm = this.formBuilder.group({
            id: [null],
            name: [null, [forms_1.Validators.required]],
            datasets: [[]],
            description: [null]
        });
        this.route.queryParams.subscribe(function (params) {
            if (params.id) {
                _this.editMode = params.id;
                _this.setEditMode(params.id);
            }
        });
    }
    ProjectFormComponent.prototype.ngOnInit = function () { };
    ProjectFormComponent.prototype.openFileInput = function (input) {
        input.click();
    };
    ProjectFormComponent.prototype.saveProject = function () {
        var _this = this;
        if (!this.validateForm()) {
            return;
        }
        if (this.editMode) {
            this.projectService.saveEdit(this.projectForm.value).subscribe(function () {
                _this.router.navigate(['/projects']);
            }, function (error) {
                _this.errorService.setError(error_code_enum_1.ErrorMap.get("FAILED_TO_POST"));
            });
        }
        else {
            this.projectService
                .addProject(this.projectForm.value, this.datasetsToUpload)
                .subscribe(function () {
                _this.router.navigate(['/projects']);
            }, function (error) {
                _this.errorService.setError(error_code_enum_1.ErrorMap.get("FAILED_TO_POST"));
            });
        }
    };
    ProjectFormComponent.prototype.handleFileInput = function (files) {
        var _this = this;
        Array.from(files).forEach(function (file) {
            _this.datasetsToUpload.push(file);
        });
    };
    ProjectFormComponent.prototype.removeDataset = function (index) {
        this.datasetsToUpload.splice(index, 1);
    };
    ProjectFormComponent.prototype.setEditMode = function (id) {
        var _this = this;
        this.projectService.getOneProject(id).subscribe(function (response) {
            _this.projectForm.get('id').setValue(response.id);
            _this.projectForm.get('name').setValue(response.name);
            _this.projectForm.get('description').setValue(response.description);
            _this.datasetsToUpload = response.datasets.map(function (file) { return ({
                name: file.filename
            }); });
        });
    };
    ProjectFormComponent.prototype.getControlError = function (control) {
        var formControl = this.projectForm.get(control);
        return formControl.errors && formControl.touched;
    };
    ProjectFormComponent.prototype.validateForm = function () {
        if (this.projectForm.valid) {
            return true;
        }
        this.projectForm.markAllAsTouched();
        return false;
    };
    ProjectFormComponent = __decorate([
        core_1.Component({
            selector: 'app-project-form',
            templateUrl: './project-form.component.html',
            styleUrls: ['./project-form.component.scss']
        })
    ], ProjectFormComponent);
    return ProjectFormComponent;
}());
exports.ProjectFormComponent = ProjectFormComponent;
