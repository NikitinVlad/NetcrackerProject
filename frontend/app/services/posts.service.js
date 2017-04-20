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
 * Created by Влад on 12.12.2016.
 */
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var router_1 = require("@angular/router");
var locale_auth_1 = require("./locale.auth");
var PostsService = (function () {
    function PostsService(http, router, auth) {
        this.http = http;
        this.router = router;
        this.auth = auth;
    }
    PostsService.prototype.createAuthorizationHeader = function (headers) {
        var login;
        if (localStorage.getItem('currentUser') != null) {
            login = JSON.parse(localStorage.getItem('currentUser')).login;
            headers.append('Authorization', login);
        }
    };
    PostsService.prototype.sendPost = function (body, url) {
        var _this = this;
        var bodyString = JSON.stringify(body);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.createAuthorizationHeader(headers);
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post('http://localhost:8080/' + url, bodyString, options)
            .map(function (res) { return res.json(); }).catch(function (err) {
            if (err.status == 403) {
                _this.auth.logOut();
                _this.router.navigate(['login']);
            }
            return Promise.resolve();
        });
    };
    PostsService.prototype.getData = function (url) {
        var _this = this;
        var headers = new http_1.Headers();
        this.createAuthorizationHeader(headers);
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get('http://localhost:8080/' + url, options)
            .map(function (res) { return res.json(); }).catch(function (err) {
            if (err.status == 403) {
                _this.auth.logOut();
                _this.router.navigate(['login']);
            }
            return Promise.resolve();
        });
    };
    PostsService.prototype.sendFile = function (file, url) {
        var _this = this;
        var headers = new http_1.Headers({ 'Accept': 'multipart/form-data, application/json' });
        this.createAuthorizationHeader(headers);
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post('http://localhost:8080/' + url, file, options)
            .map(function (res) { return res.json(); }).catch(function (err) {
            if (err.status == 403) {
                _this.auth.logOut();
                _this.router.navigate(['login']);
            }
            return Promise.resolve();
        });
    };
    return PostsService;
}());
PostsService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, router_1.Router, locale_auth_1.LocaleAuth])
], PostsService);
exports.PostsService = PostsService;
//# sourceMappingURL=posts.service.js.map