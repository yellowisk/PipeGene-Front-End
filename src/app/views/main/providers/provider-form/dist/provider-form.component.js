"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProviderFormComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var error_code_enum_1 = require("src/app/enums/error-code.enum");
var ProviderFormComponent = /** @class */ (function () {
    function ProviderFormComponent(providerService, formBuilder, errorService, router) {
        this.providerService = providerService;
        this.formBuilder = formBuilder;
        this.errorService = errorService;
        this.router = router;
        this.operations = [];
        this.providerForm = this.formBuilder.group({
            name: [null, [forms_1.Validators.required]],
            url: [null, [forms_1.Validators.required]],
            description: [null, [forms_1.Validators.required]],
            inputSupportedTypes: [null, [forms_1.Validators.required]],
            outputSupportedTypes: [null, [forms_1.Validators.required]]
        });
    }
    ProviderFormComponent.prototype.ngOnInit = function () { };
    ProviderFormComponent.prototype.submitProvider = function () {
        var _this = this;
        if (!this.validateForm()) {
            return;
        }
        var newProvider = {
            name: this.providerForm.get('name').value,
            url: this.providerForm.get('url').value,
            description: this.providerForm.get('description').value,
            inputSupportedTypes: this.providerForm
                .get('inputSupportedTypes')
                .value.split(','),
            outputSupportedTypes: this.providerForm
                .get('outputSupportedTypes')
                .value.split(','),
            operations: this.operations
        };
        this.providerService.submitProviders(newProvider).subscribe(function () {
            _this.router.navigate(['/services']);
        }, function (error) {
            _this.errorService.setError(error_code_enum_1.ErrorMap.get("FAILED_TO_POST"));
        });
    };
    ProviderFormComponent.prototype.openOperationsModal = function () {
        this.operationModal.open();
    };
    ProviderFormComponent.prototype.addOperation = function (event) {
        this.operations.push(event);
    };
    ProviderFormComponent.prototype.getControlError = function (control) {
        var formControl = this.providerForm.get(control);
        return formControl.errors && formControl.touched;
    };
    ProviderFormComponent.prototype.validateForm = function () {
        if (this.providerForm.valid) {
            return true;
        }
        this.providerForm.markAllAsTouched();
        return false;
    };
    __decorate([
        core_1.ViewChild('operationModal')
    ], ProviderFormComponent.prototype, "operationModal");
    ProviderFormComponent = __decorate([
        core_1.Component({
            selector: 'app-provider-form',
            templateUrl: './provider-form.component.html',
            styleUrls: ['./provider-form.component.scss']
        })
    ], ProviderFormComponent);
    return ProviderFormComponent;
}());
exports.ProviderFormComponent = ProviderFormComponent;
