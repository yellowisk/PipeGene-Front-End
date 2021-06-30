"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProjectDetailsModalComponent = void 0;
var core_1 = require("@angular/core");
var error_code_enum_1 = require("src/app/enums/error-code.enum");
var ProjectDetailsModalComponent = /** @class */ (function () {
    function ProjectDetailsModalComponent(modalService, projectService, executionService, errorService, router) {
        this.modalService = modalService;
        this.projectService = projectService;
        this.executionService = executionService;
        this.errorService = errorService;
        this.router = router;
        this.executions = [];
    }
    ProjectDetailsModalComponent.prototype.ngOnInit = function () { };
    ProjectDetailsModalComponent.prototype.setDetails = function (data) {
        var _this = this;
        this.project = data;
        this.modalRef = this.modalService.show(this.modal);
        this.executionService.listProjectExecutions(data.id).subscribe(function (response) {
            _this.executions = response;
        }, function (error) {
            _this.errorService.setError(error_code_enum_1.ErrorMap.get("FAILED_TO_GET"));
        });
    };
    ProjectDetailsModalComponent.prototype.deleteProject = function () {
        var _this = this;
        this.projectService.deleteProject(this.project.id).subscribe(function (response) {
            _this.modalRef.hide();
        }, function (error) {
            _this.errorService.setError(error_code_enum_1.ErrorMap.get("FAILED_TO_DELETE_PROJECT"));
        });
    };
    ProjectDetailsModalComponent.prototype.setEditMode = function () {
        this.modalRef.hide();
        this.router.navigate(["/projects/edit/"], {
            queryParams: { id: this.project.id }
        });
    };
    __decorate([
        core_1.ViewChild("modal")
    ], ProjectDetailsModalComponent.prototype, "modal");
    ProjectDetailsModalComponent = __decorate([
        core_1.Component({
            selector: "app-project-details-modal",
            templateUrl: "./project-details-modal.component.html",
            styleUrls: ["./project-details-modal.component.scss"]
        })
    ], ProjectDetailsModalComponent);
    return ProjectDetailsModalComponent;
}());
exports.ProjectDetailsModalComponent = ProjectDetailsModalComponent;
