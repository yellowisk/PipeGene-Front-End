"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProjectsComponent = void 0;
var core_1 = require("@angular/core");
var error_code_enum_1 = require("src/app/enums/error-code.enum");
var ProjectsComponent = /** @class */ (function () {
    function ProjectsComponent(projectService, errorService) {
        this.projectService = projectService;
        this.errorService = errorService;
        this.projects = [];
    }
    ProjectsComponent.prototype.ngOnInit = function () {
        this.getProjects();
    };
    ProjectsComponent.prototype.getProjects = function () {
        var _this = this;
        this.projectService.listProjects().subscribe(function (response) {
            _this.projects = response;
        }, function (error) {
            _this.errorService.setError(error_code_enum_1.ErrorMap.get("FAILED_TO_GET"));
        });
    };
    ProjectsComponent.prototype.showProjectDetails = function (project) {
        this.detailsModal.setDetails(project);
    };
    __decorate([
        core_1.ViewChild("detailsModal")
    ], ProjectsComponent.prototype, "detailsModal");
    ProjectsComponent = __decorate([
        core_1.Component({
            selector: "app-projects",
            templateUrl: "./projects.component.html",
            styleUrls: ["./projects.component.scss"]
        })
    ], ProjectsComponent);
    return ProjectsComponent;
}());
exports.ProjectsComponent = ProjectsComponent;
