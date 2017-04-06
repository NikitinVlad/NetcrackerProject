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
var CurLang_1 = require("./Entities/CurLang");
var posts_service_1 = require("./services/posts.service");
var Lang_1 = require("./dto/Lang");
var AppComponent = (function () {
    function AppComponent(postsService, router, toasterService, localeAuth, swapData) {
        this.postsService = postsService;
        this.router = router;
        this.toasterService = toasterService;
        this.localeAuth = localeAuth;
        this.swapData = swapData;
        this.loc = CurLang_1.CurLang.locale;
        this.toasterconfig = new angular2_toaster_1.ToasterConfig({ positionClass: 'center', limit: 1 });
        this.toast = {
            type: 'warning',
            title: 'Title text',
            body: 'Body text',
            timeout: 2000,
            showCloseButton: true
        };
    }
    AppComponent.prototype.test = function () {
        var _this = this;
        return this.postsService.sendPost(new Lang_1.Lang(CurLang_1.CurLang.lang).lang, "messageBundle").toPromise()
            .then(function (data) {
            CurLang_1.CurLang.locale = data;
            _this.loc = CurLang_1.CurLang.locale;
        })
            .catch(function (err) { return Promise.resolve(); });
    };
    AppComponent.prototype.changeLang = function (lang) {
        var _this = this;
        CurLang_1.CurLang.lang = lang;
        this.test().then(function (answ) {
            console.log('Выполнилась');
            _this.router.navigate(['help']);
        });
    };
    AppComponent.prototype.goMainPage = function () {
        this.router.navigate(["main"]);
    };
    AppComponent.prototype.goRegistration = function () {
        this.toasterService.pop("warning", this.loc.mes_welcome, this.loc.mes_welcome_body);
        this.router.navigate(["registration"]);
    };
    AppComponent.prototype.goLogin = function () {
        this.router.navigate(["login"]);
    };
    AppComponent.prototype.goPersonalArea = function (page) {
        this.swapData.personalAreaServ.setCurrentPage(page);
        swap_data_1.RouteTo.rout = 'personal';
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
    __metadata("design:paramtypes", [posts_service_1.PostsService, router_1.Router, angular2_toaster_1.ToasterService, locale_auth_1.LocaleAuth, swap_data_1.SwapData])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map