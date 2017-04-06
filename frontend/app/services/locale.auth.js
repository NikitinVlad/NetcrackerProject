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
var User_1 = require("../Entities/User");
var core_1 = require("@angular/core");
/**
 * Created by Влад on 16.03.2017.
 */
var LocaleAuth = (function () {
    function LocaleAuth() {
        this.localeItem = 'currentUser';
    }
    LocaleAuth.prototype.checkAuth = function () {
        if (localStorage.getItem(this.localeItem)) {
            return true;
        }
        else {
            return false;
        }
    };
    LocaleAuth.prototype.logIn = function (user) {
        localStorage.setItem(this.localeItem, JSON.stringify(user));
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    };
    LocaleAuth.prototype.logOut = function () {
        localStorage.removeItem(this.localeItem);
    };
    LocaleAuth.prototype.getUser = function () {
        if (this.checkAuth()) {
            var user;
            user = Object.assign(new User_1.User("", "", "", ""), JSON.parse(localStorage.getItem(this.localeItem)));
            return user;
        }
    };
    LocaleAuth.prototype.getRole = function () {
        var user = this.getUser();
        return user.role;
    };
    LocaleAuth.prototype.getLogin = function () {
        var user = this.getUser();
        return user.login;
    };
    return LocaleAuth;
}());
LocaleAuth = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], LocaleAuth);
exports.LocaleAuth = LocaleAuth;
//# sourceMappingURL=locale.auth.js.map