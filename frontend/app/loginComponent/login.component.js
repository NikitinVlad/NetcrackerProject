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
/**
 * Created by Влад on 01.04.2017.
 */
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var posts_service_1 = require("../services/posts.service");
var User_1 = require("../Entities/User");
var locale_auth_1 = require("../services/locale.auth");
var router_1 = require("@angular/router");
var LoginComponent = (function () {
    function LoginComponent(postsService, fb, localeAuth, router) {
        this.postsService = postsService;
        this.localeAuth = localeAuth;
        this.router = router;
        this.myerror = false;
        this.complexForm = fb.group({
            'login': [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(3), forms_1.Validators.maxLength(15)])],
            'pass': [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(4), forms_1.Validators.maxLength(20)])]
        });
    }
    LoginComponent.prototype.submitForm = function (form) {
        var _this = this;
        var user = new User_1.User("", form.login, form.pass, "");
        this.postsService.sendPost(user, 'checkUser').subscribe(function (answer) {
            if (answer.id != "") {
                _this.myerror = false;
                var user = answer;
                _this.localeAuth.logIn(user);
                _this.router.navigate(["main"]);
            }
            else {
                _this.myerror = true;
            }
        });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "logIn",
        templateUrl: "login.component.html",
        styleUrls: ["login.component.css"]
    }),
    __metadata("design:paramtypes", [posts_service_1.PostsService, forms_1.FormBuilder, locale_auth_1.LocaleAuth, router_1.Router])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map