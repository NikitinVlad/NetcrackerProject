"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var angular2_toaster_1 = require("angular2-toaster");
var locale_auth_1 = require("./services/locale.auth");
var swap_data_1 = require("./services/communicate/swap.data");
var AppComponent = (function () {
    function AppComponent(router, toasterService, localeAuth, swapData) {
        this.router = router;
        this.toasterService = toasterService;
        this.localeAuth = localeAuth;
        this.swapData = swapData;
        // this.auth=new LocaleAuth();
        this.toasterconfig = new angular2_toaster_1.ToasterConfig({ positionClass: 'center', limit: 1 });
        this.toast = {
            type: 'warning',
            title: 'Title text',
            body: 'Body text',
            timeout: 2000,
            showCloseButton: true
        };
    }
    AppComponent.prototype.goMainPage = function () {
        this.router.navigate(["main"]);
    };
    AppComponent.prototype.goRegistration = function () {
        this.toasterService.pop("warning", "Добро пожаловать", "Зарегистрируйтесь и вы войдете в систему :)");
        this.router.navigate(["registration"]);
    };
    AppComponent.prototype.goLogin = function () {
        this.router.navigate(["login"]);
    };
    AppComponent.prototype.goPersonalArea = function (page) {
        this.swapData.personalAreaServ.setCurrentPage(page);
        this.router.navigate(["help"]);
    };
    AppComponent.prototype.exit = function () {
        this.localeAuth.logOut();
        this.goMainPage();
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "my-app",
        templateUrl: "app.component.html",
        styleUrls: ["app.component.css"]
    }),
    __metadata("design:paramtypes", [router_1.Router, angular2_toaster_1.ToasterService, locale_auth_1.LocaleAuth, swap_data_1.SwapData])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map