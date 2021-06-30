"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProjectService = void 0;
var environment_1 = require("./../../../../environments/environment");
var core_1 = require("@angular/core");
var ProjectService = /** @class */ (function () {
    function ProjectService(http) {
        this.http = http;
    }
    ProjectService.prototype.addProject = function (project, files) {
        var formData = new FormData();
        formData.append('name', project.name);
        formData.append('description', project.description);
        files.forEach(function (file) { return formData.append('files', file, file.name); });
        return this.http.post(environment_1.environment.baseUrl + "/api/v1/projects/", formData);
    };
    ProjectService.prototype.listProjects = function () {
        return this.http.get(environment_1.environment.baseUrl + "/api/v1/projects/");
    };
    ProjectService.prototype.deleteProject = function (id) {
        return this.http["delete"](environment_1.environment.baseUrl + "/api/v1/projects/" + id);
    };
    ProjectService.prototype.getOneProject = function (id) {
        return this.http.get(environment_1.environment.baseUrl + "/api/v1/projects/" + id);
    };
    ProjectService.prototype.saveEdit = function (project) {
        return this.http.put(environment_1.environment.baseUrl + "/api/v1/projects/" + project.id, {
            name: project.name,
            description: project.description
        });
    };
    ProjectService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ProjectService);
    return ProjectService;
}());
exports.ProjectService = ProjectService;
