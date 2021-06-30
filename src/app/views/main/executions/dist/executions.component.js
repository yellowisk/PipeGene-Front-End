"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ExecutionsComponent = void 0;
var core_1 = require("@angular/core");
var error_code_enum_1 = require("src/app/enums/error-code.enum");
var ExecutionsComponent = /** @class */ (function () {
    function ExecutionsComponent(executionService, errorService) {
        this.executionService = executionService;
        this.errorService = errorService;
        this.executions = [];
    }
    ExecutionsComponent.prototype.ngOnInit = function () {
        this.getExecutions();
    };
    ExecutionsComponent.prototype.getExecutions = function () {
        var _this = this;
        this.executionService.listExecutions().subscribe(function (response) {
            _this.executions = response;
        }, function (error) {
            _this.errorService.setError(error_code_enum_1.ErrorMap.get('FAILED_TO_GET'));
        });
    };
    ExecutionsComponent = __decorate([
        core_1.Component({
            selector: 'app-executions',
            templateUrl: './executions.component.html',
            styleUrls: ['./executions.component.scss']
        })
    ], ExecutionsComponent);
    return ExecutionsComponent;
}());
exports.ExecutionsComponent = ExecutionsComponent;
