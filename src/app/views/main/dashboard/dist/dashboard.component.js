"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DashboardComponent = void 0;
var error_code_enum_1 = require("./../../../enums/error-code.enum");
var core_1 = require("@angular/core");
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(router, executionService, errorService) {
        this.router = router;
        this.executionService = executionService;
        this.errorService = errorService;
        this.executions = [];
        this.options = [
            {
                name: "Projetos",
                icon: "far fa-folder-open",
                url: "/projects"
            },
            {
                name: "Pipelines",
                icon: "fas fa-stream",
                url: "/pipelines"
            },
            {
                name: "Execuções",
                icon: "fas fa-tasks",
                url: "/executions"
            },
            {
                name: "Serviços",
                icon: "fas fa-cogs",
                url: "/services"
            },
        ];
    }
    DashboardComponent.prototype.ngOnInit = function () {
        this.username = sessionStorage.getItem("username");
        this.getExecutions();
        this.getToday();
    };
    DashboardComponent.prototype.getExecutions = function () {
        var _this = this;
        this.executionService.listExecutions().subscribe(function (response) {
            _this.executions = response;
        }, function (error) {
            _this.errorService.setError(error_code_enum_1.ErrorMap.get("FAILED_TO_GET"));
        });
    };
    DashboardComponent.prototype.getToday = function () {
        var daysOfWeek = [
            "Domingo",
            "Segunda-feira",
            "Terça-feira",
            "Quarta-feira",
            "Quinta-feira",
            "Sexta-feira",
            "Sábado",
        ];
        var date = new Date();
        this.today = "" + daysOfWeek[date.getDay()];
    };
    DashboardComponent.prototype.redirect = function (path) {
        this.router.navigate([path]);
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: "app-dashboard",
            templateUrl: "./dashboard.component.html",
            styleUrls: ["./dashboard.component.scss"]
        })
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
