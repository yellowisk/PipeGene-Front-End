"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SignupComponent = void 0;
var error_code_enum_1 = require("./../../../enums/error-code.enum");
var forms_1 = require("@angular/forms");
var core_1 = require("@angular/core");
var SignupComponent = /** @class */ (function () {
    function SignupComponent(formBuilder, signService, errorService, router) {
        this.formBuilder = formBuilder;
        this.signService = signService;
        this.errorService = errorService;
        this.router = router;
        this.signupForm = this.formBuilder.group({
            name: [null, [forms_1.Validators.required]],
            username: [null, [forms_1.Validators.required]],
            password: [null, [forms_1.Validators.required]],
            orcid: [null],
            github: [null]
        });
    }
    SignupComponent.prototype.ngOnInit = function () { };
    SignupComponent.prototype.signup = function () {
        var _this = this;
        this.signService.signup(this.signupForm.value).subscribe(function () { return _this.router.navigate(['/login']); }, function (error) {
            _this.errorService.setError(error_code_enum_1.ErrorMap.get('REGISTRATION_FAILED'));
        });
    };
    SignupComponent.prototype.getControlError = function (control) {
        var formControl = this.signupForm.get(control);
        return formControl.errors && formControl.touched;
    };
    SignupComponent.prototype.validateForm = function () {
        if (this.signupForm.valid) {
            return true;
        }
        this.signupForm.markAllAsTouched();
        return false;
    };
    SignupComponent = __decorate([
        core_1.Component({
            selector: 'app-signup',
            templateUrl: './signup.component.html',
            styleUrls: ['./signup.component.scss']
        })
    ], SignupComponent);
    return SignupComponent;
}());
exports.SignupComponent = SignupComponent;
