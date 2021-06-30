"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var error_component_1 = require("./components/error/error.component");
var auth_service_1 = require("src/app/services/auth.service");
var input_validation_module_1 = require("./components/input-validation/input-validation.module");
var httpRequest_interceptor_1 = require("./interceptors/httpRequest.interceptor");
var http_1 = require("@angular/common/http");
var main_module_1 = require("./views/main/main.module");
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var modal_1 = require("ngx-bootstrap/modal");
var login_component_1 = require("./views/auth/login/login.component");
var signup_component_1 = require("./views/auth/signup/signup.component");
var loading_component_1 = require("./components/loading/loading.component");
var popover_1 = require("ngx-bootstrap/popover");
var forms_1 = require("@angular/forms");
var auth_guard_1 = require("./guards/auth.guard");
var ngx_cookie_1 = require("ngx-cookie");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                login_component_1.LoginComponent,
                signup_component_1.SignupComponent,
                loading_component_1.LoadingComponent,
                error_component_1.ErrorComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.ReactiveFormsModule,
                forms_1.FormsModule,
                app_routing_module_1.AppRoutingModule,
                main_module_1.MainModule,
                http_1.HttpClientModule,
                input_validation_module_1.InputValidationModule,
                modal_1.ModalModule.forRoot(),
                popover_1.PopoverModule.forRoot(),
                ngx_cookie_1.CookieModule.forRoot(),
            ],
            providers: [
                {
                    provide: http_1.HTTP_INTERCEPTORS,
                    useClass: httpRequest_interceptor_1.HttpRequestInterceptor,
                    multi: true
                },
                auth_guard_1.AuthGuard,
                auth_service_1.AuthService
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
