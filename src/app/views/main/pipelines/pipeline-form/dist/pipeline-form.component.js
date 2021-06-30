"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PipelineFormComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var error_code_enum_1 = require("src/app/enums/error-code.enum");
var PipelineFormComponent = /** @class */ (function () {
    function PipelineFormComponent(providerService, projectService, pipelineService, formBuilder, errorService, router) {
        this.providerService = providerService;
        this.projectService = projectService;
        this.pipelineService = pipelineService;
        this.formBuilder = formBuilder;
        this.errorService = errorService;
        this.router = router;
        this.selectedProviders = [];
        this.steps = [];
    }
    PipelineFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.pipelineForm = this.formBuilder.group({
            executionName: [null, [forms_1.Validators.required]],
            projectId: [null, [forms_1.Validators.required]],
            executionSteps: this.formBuilder.array([])
        });
        this.pipelineForm.get("projectId").valueChanges.subscribe(function (value) {
            _this.selectedProject = _this.projects.filter(function (project) { return project.id === value; })[0];
            var stepsArray = _this.pipelineForm.controls.executionSteps;
            if (stepsArray.length < 1) {
                _this.addStep();
            }
        });
        this.getProviders();
        this.getProjects();
    };
    PipelineFormComponent.prototype.getProviders = function () {
        var _this = this;
        this.providerService.listProviders().subscribe(function (response) {
            _this.providers = response;
        }, function (error) {
            _this.errorService.setError(error_code_enum_1.ErrorMap.get("FAILED_TO_GET"));
        });
    };
    PipelineFormComponent.prototype.getProjects = function () {
        var _this = this;
        this.projectService.listProjects().subscribe(function (response) {
            _this.projects = response;
        }, function (error) {
            _this.errorService.setError(error_code_enum_1.ErrorMap.get("FAILED_TO_GET"));
        });
    };
    PipelineFormComponent.prototype.initStepRow = function (inputType) {
        return this.formBuilder.group({
            providerId: [null, [forms_1.Validators.required]],
            inputType: [inputType || ""],
            outputType: [null, [forms_1.Validators.required]],
            params: [null]
        });
    };
    PipelineFormComponent.prototype.addStep = function () {
        this.steps.push(this.steps.length + 1);
        var stepsArray = this.pipelineForm.controls.executionSteps;
        stepsArray.push(this.initStepRow(this.getFileType()));
    };
    PipelineFormComponent.prototype.removeStep = function (index) {
        var stepsArray = this.pipelineForm.controls.executionSteps;
        if (stepsArray.length <= 1) {
            return;
        }
        this.steps.splice(this.steps.length - 1, 1);
        this.selectedProviders.splice(this.providers.length - 1, 1);
        stepsArray.removeAt(index);
    };
    PipelineFormComponent.prototype.getFileType = function () {
        if (this.pipelineForm.get("executionSteps").value.length > 0) {
            return this.pipelineForm.get("executionSteps").value[this.pipelineForm.get("executionSteps").value.length - 1].outputType;
        }
        return null;
    };
    PipelineFormComponent.prototype.setProvider = function (index) {
        var _this = this;
        this.selectedProviders[index] = this.providers.filter(function (p) {
            return p.id ===
                _this.pipelineForm.get("executionSteps").value[_this.steps.length - 1]
                    .providerId;
        })[0];
    };
    PipelineFormComponent.prototype.initServiceConfig = function (index) {
        var _this = this;
        this.serviceConfigIndex = index;
        this.configProviderModal.setOperations(this.providers.filter(function (p) { return p.id === _this.selectedProviders[index].id; })[0]
            .operations);
    };
    PipelineFormComponent.prototype.saveServiceConfigs = function (event) {
        var controlArray = this.pipelineForm.get("executionSteps");
        controlArray.controls[this.serviceConfigIndex]
            .get("params")
            .setValue(event);
        this.serviceConfigIndex = null;
    };
    PipelineFormComponent.prototype.serviceIsConfigured = function (index) {
        var _a;
        var controlArray = this.pipelineForm.get("executionSteps");
        return (_a = controlArray.controls[index]) === null || _a === void 0 ? void 0 : _a.get("params").value;
    };
    PipelineFormComponent.prototype.createPipeline = function () {
        var _this = this;
        if (!this.validateForm()) {
            return;
        }
        var pipeline = this.pipelineForm.value;
        this.pipelineService
            .createPipeline({
            description: pipeline.executionName,
            steps: pipeline.executionSteps
        }, pipeline.projectId)
            .subscribe(function () { return _this.router.navigate(["/pipelines"]); }, function (error) {
            _this.errorService.setError(error_code_enum_1.ErrorMap.get("FAILED_TO_POST"));
        });
    };
    PipelineFormComponent.prototype.getControlError = function (control) {
        var formControl = this.pipelineForm.get(control);
        return formControl.errors && formControl.touched;
    };
    PipelineFormComponent.prototype.validateForm = function () {
        var stepsArray = this.pipelineForm.controls.executionSteps;
        if (this.pipelineForm.valid && stepsArray.valid) {
            return true;
        }
        this.pipelineForm.markAllAsTouched();
        stepsArray.markAllAsTouched();
        return false;
    };
    __decorate([
        core_1.ViewChild("configProviderModal")
    ], PipelineFormComponent.prototype, "configProviderModal");
    PipelineFormComponent = __decorate([
        core_1.Component({
            selector: "app-pipeline-form",
            templateUrl: "./pipeline-form.component.html",
            styleUrls: ["./pipeline-form.component.scss"]
        })
    ], PipelineFormComponent);
    return PipelineFormComponent;
}());
exports.PipelineFormComponent = PipelineFormComponent;
