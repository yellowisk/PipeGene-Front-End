"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProvidersComponent = void 0;
var core_1 = require("@angular/core");
var error_code_enum_1 = require("src/app/enums/error-code.enum");
var ProvidersComponent = /** @class */ (function () {
    function ProvidersComponent(providerService, errorService) {
        this.providerService = providerService;
        this.errorService = errorService;
        this.providers = [];
    }
    ProvidersComponent.prototype.ngOnInit = function () {
        this.getProviders();
    };
    ProvidersComponent.prototype.getProviders = function () {
        var _this = this;
        this.providerService.listProviders().subscribe(function (response) {
            _this.providers = response;
        }, function (error) {
            _this.errorService.setError(error_code_enum_1.ErrorMap.get("FAILED_TO_GET"));
        });
    };
    ProvidersComponent = __decorate([
        core_1.Component({
            selector: "app-providers",
            templateUrl: "./providers.component.html",
            styleUrls: ["./providers.component.scss"]
        })
    ], ProvidersComponent);
    return ProvidersComponent;
}());
exports.ProvidersComponent = ProvidersComponent;
