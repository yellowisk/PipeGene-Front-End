"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ErrorComponent = void 0;
var core_1 = require("@angular/core");
var error_code_enum_1 = require("../../enums/error-code.enum");
var ErrorComponent = /** @class */ (function () {
    function ErrorComponent(errorContent, connectionService, modalService) {
        this.errorContent = errorContent;
        this.connectionService = connectionService;
        this.modalService = modalService;
        this.modalInfo = {
            title: '',
            icon: '',
            description: ''
        };
    }
    ErrorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.errorContent.errorEmmiter.subscribe(function (modalInfo) {
            _this.modalInfo = modalInfo;
            _this.openModal();
        });
        this.connectionService.monitor().subscribe(function (isConnected) {
            if (!isConnected) {
                _this.modalInfo = error_code_enum_1.ErrorMap.get('NOT_CONNECTED');
                _this.openModal();
            }
        });
    };
    ErrorComponent.prototype.openModal = function () {
        this.modalRef = this.modalService.show(this.modal);
    };
    __decorate([
        core_1.ViewChild('modal')
    ], ErrorComponent.prototype, "modal");
    ErrorComponent = __decorate([
        core_1.Component({
            selector: 'app-error',
            templateUrl: './error.component.html',
            styleUrls: ['./error.component.scss']
        })
    ], ErrorComponent);
    return ErrorComponent;
}());
exports.ErrorComponent = ErrorComponent;
