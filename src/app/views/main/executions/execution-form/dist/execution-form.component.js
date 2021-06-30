"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ExecutionFormComponent = void 0;
var error_code_enum_1 = require("src/app/enums/error-code.enum");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var ExecutionFormComponent = /** @class */ (function () {
    function ExecutionFormComponent(projectService, executionService, pipelineService, formBuilder, errorService, router) {
        this.projectService = projectService;
        this.executionService = executionService;
        this.pipelineService = pipelineService;
        this.formBuilder = formBuilder;
        this.errorService = errorService;
        this.router = router;
        this.pipelines = [];
    }
    ExecutionFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.executionForm = this.formBuilder.group({
            description: [null, [forms_1.Validators.required]],
            projectId: [null, [forms_1.Validators.required]],
            datasetId: [null, [forms_1.Validators.required]],
            pipelineId: [null, [forms_1.Validators.required]]
        });
        this.executionForm.get("projectId").valueChanges.subscribe(function (value) {
            _this.selectedProject = _this.projects.filter(function (project) { return project.id === value; })[0];
            _this.getPipelines(_this.selectedProject.id);
        });
        this.getProjects();
    };
    ExecutionFormComponent.prototype.getProjects = function () {
        var _this = this;
        this.projectService.listProjects().subscribe(function (response) {
            _this.projects = response;
        }, function (error) {
            _this.errorService.setError(error_code_enum_1.ErrorMap.get("FAILED_TO_GET"));
        });
    };
    ExecutionFormComponent.prototype.getPipelines = function (id) {
        var _this = this;
        this.pipelineService.listProjectPipelines(id).subscribe(function (response) {
            _this.pipelines = response;
        }, function (error) {
            _this.errorService.setError(error_code_enum_1.ErrorMap.get("FAILED_TO_GET"));
        });
    };
    ExecutionFormComponent.prototype.createExecution = function () {
        var _this = this;
        if (!this.validateForm()) {
            return;
        }
        this.executionService
            .createExecution({
            datasetId: this.executionForm.get("datasetId").value,
            pipelineId: this.executionForm.get("pipelineId").value,
            description: this.executionForm.get("description").value
        }, this.executionForm.get("projectId").value)
            .subscribe(function () {
            _this.router.navigate(["/executions"]);
        }, function (error) {
            _this.errorService.setError(error_code_enum_1.ErrorMap.get("FAILED_TO_POST"));
        });
    };
    ExecutionFormComponent.prototype.getControlError = function (control) {
        var formControl = this.executionForm.get(control);
        return formControl.errors && formControl.touched;
    };
    ExecutionFormComponent.prototype.validateForm = function () {
        if (this.executionForm.valid) {
            return true;
        }
        this.executionForm.markAllAsTouched();
        return false;
    };
    ExecutionFormComponent = __decorate([
        core_1.Component({
            selector: "app-execution-form",
            templateUrl: "./execution-form.component.html",
            styleUrls: ["./execution-form.component.scss"]
        })
    ], ExecutionFormComponent);
    return ExecutionFormComponent;
}());
exports.ExecutionFormComponent = ExecutionFormComponent;
