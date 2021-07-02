"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HttpRequestInterceptor = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var operators_1 = require("rxjs/operators");
/**
 * This class is for intercepting http requests. When a request starts, we set the loadingSub property
 * in the LoadingService to true. Once the request completes and we have a response, set the loadingSub
 * property to false. If an error occurs while servicing the request, set the loadingSub property to false.
 * class {HttpRequestInterceptor}
 */
var HttpRequestInterceptor = /** @class */ (function () {
    function HttpRequestInterceptor(loadingService, authService, router) {
        this.loadingService = loadingService;
        this.authService = authService;
        this.router = router;
    }
    HttpRequestInterceptor.prototype.intercept = function (request, next) {
        var _this = this;
        this.loadingService.setLoading(true, request.url);
        var token = this.authService.getToken();
        var req = token ? this.addAuthorizationHeaderAndClone(request, token) : request.clone();
        return next.handle(req)
            .pipe(operators_1.catchError(function (err) {
            _this.loadingService.setLoading(false, req.url);
            if (err.status === 403) {
                _this.router.navigate(['/login']);
            }
            return err;
        }))
            .pipe(operators_1.map(function (evt) {
            if (evt instanceof http_1.HttpResponse) {
                _this.loadingService.setLoading(false, req.url);
            }
            return evt;
        }));
    };
    HttpRequestInterceptor.prototype.addAuthorizationHeaderAndClone = function (request, token) {
        return request.clone({ headers: request.headers.append('Authorization', token) });
    };
    HttpRequestInterceptor = __decorate([
        core_1.Injectable()
    ], HttpRequestInterceptor);
    return HttpRequestInterceptor;
}());
exports.HttpRequestInterceptor = HttpRequestInterceptor;
