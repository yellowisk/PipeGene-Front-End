"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginComponent = void 0;
var error_code_enum_1 = require("../../../enums/error-code.enum");
var forms_1 = require("@angular/forms");
var core_1 = require("@angular/core");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(formBuilder, signService, authService, errorService, router) {
        this.formBuilder = formBuilder;
        this.signService = signService;
        this.authService = authService;
        this.errorService = errorService;
        this.router = router;
        this.loginForm = this.formBuilder.group({
            username: [null, [forms_1.Validators.required]],
            password: [null, [forms_1.Validators.required]]
        });
    }
    LoginComponent.prototype.ngOnInit = function () { };
    LoginComponent.prototype.login = function () {
        var _this = this;
        if (!this.validateForm()) {
            return;
        }
        this.signService.login(this.loginForm.value).subscribe(function (response) {
            _this.authService.initSession(response.headers.get('Authorization'));
            _this.router.navigate(['/']);
        }, function (error) {
            _this.errorService.setError(error_code_enum_1.ErrorMap.get('INVALID_CREDENTIALS'));
        });
    };
    LoginComponent.prototype.getControlError = function (control) {
        var formControl = this.loginForm.get(control);
        return formControl.errors && formControl.touched;
    };
    LoginComponent.prototype.validateForm = function () {
        if (this.loginForm.valid) {
            return true;
        }
        this.loginForm.markAllAsTouched();
        return false;
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.scss']
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
