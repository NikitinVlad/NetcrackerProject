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
 * Created by Влад on 14.03.2017.
 */
var core_1 = require("@angular/core");
var posts_service_1 = require("../services/posts.service");
var router_1 = require("@angular/router");
var angular2_toaster_1 = require("angular2-toaster");
var forms_1 = require("@angular/forms");
var User_1 = require("../Entities/User");
var RegistrationComponent = (function () {
    function RegistrationComponent(postsService, router, toasterService, fb) {
        this.postsService = postsService;
        this.router = router;
        this.toasterService = toasterService;
        var EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.complexForm = fb.group({
            'name': [null, forms_1.Validators.required],
            'login': [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(3), forms_1.Validators.maxLength(15)])],
            'pass': [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(4), forms_1.Validators.maxLength(20)])],
            'email': [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(5), forms_1.Validators.pattern(EMAIL_REGEXP), forms_1.Validators.maxLength(30)])]
        });
        this.isAdmin = false;
        this.id = 1;
        this.toasterconfig = new angular2_toaster_1.ToasterConfig({ positionClass: 'center' });
        this.toast = {
            type: 'warning',
            title: 'Title text',
            body: 'Body text',
            timeout: 2000,
            showCloseButton: true
        };
    }
    RegistrationComponent.prototype.submitForm = function (form) {
        var _this = this;
        var user = new User_1.User(form.name, form.login, form.pass, form.email);
        console.log(user);
        this.postsService.sendPost(user, 'createUser').subscribe(function (answer) {
            console.log(answer);
            if (answer >= 1) {
                _this.showToast('success', 'Поздравляем', 'Вы были успешно зарегистрированы');
                _this.router.navigate(["main"]);
            }
            else {
                _this.showToast('error', 'Ошибка', 'Пользователь c логином ' + user.login + ' уже существует');
            }
        });
        // Role.title=form.login;
        // // this.auth.logIn(user);
    };
    RegistrationComponent.prototype.showToast = function (type, title, body) {
        console.log('there');
        this.toast.type = type;
        this.toast.title = title;
        this.toast.body = body;
        this.toasterService.pop(this.toast);
    };
    return RegistrationComponent;
}());
RegistrationComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "registration",
        templateUrl: "registration.component.html",
        styleUrls: ["registration.component.css"],
    }),
    __metadata("design:paramtypes", [posts_service_1.PostsService, router_1.Router, angular2_toaster_1.ToasterService, forms_1.FormBuilder])
], RegistrationComponent);
exports.RegistrationComponent = RegistrationComponent;
//# sourceMappingURL=registration.component.js.map