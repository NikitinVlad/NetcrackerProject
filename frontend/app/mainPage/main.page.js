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
var locale_auth_1 = require("../services/locale.auth");
var CurLang_1 = require("../Entities/CurLang");
var swap_data_1 = require("../services/communicate/swap.data");
var MainPage = (function () {
    function MainPage(router, localeAuth) {
        this.router = router;
        this.localeAuth = localeAuth;
        console.log('main');
        console.log(CurLang_1.CurLang.locale);
        this.loc = CurLang_1.CurLang.locale;
        swap_data_1.RouteTo.rout = 'main';
    }
    MainPage.prototype.goRegistration = function () {
        if (!this.localeAuth.checkAuth()) {
            this.router.navigate(['registration']);
        }
    };
    MainPage.prototype.goLogin = function () {
        if (!this.localeAuth.checkAuth()) {
            this.router.navigate(['login']);
        }
    };
    return MainPage;
}());
MainPage = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "main-page",
        templateUrl: "main.page.html",
        styleUrls: ["main.page.css"]
    }),
    __metadata("design:paramtypes", [router_1.Router, locale_auth_1.LocaleAuth])
], MainPage);
exports.MainPage = MainPage;
//# sourceMappingURL=main.page.js.map