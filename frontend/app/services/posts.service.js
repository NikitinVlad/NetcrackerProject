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
var PostsService = (function () {
    function PostsService(http) {
        this.http = http;
    }
    PostsService.prototype.sendPost = function (body, url) {
        var bodyString = JSON.stringify(body);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post('http://localhost:8080/' + url, bodyString, options)
            .map(function (res) { return res.json(); });
    };
    PostsService.prototype.getData = function (url) {
        return this.http.get('http://localhost:8080/' + url)
            .map(function (res) { return res.json(); });
    };
    PostsService.prototype.sendFile = function (file, url) {
        var headers = new http_1.Headers({ 'Accept': 'multipart/form-data, application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post('http://localhost:8080/' + url, file, options)
            .map(function (res) { return res.json(); });
    };
    return PostsService;
}());
PostsService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], PostsService);
exports.PostsService = PostsService;
//# sourceMappingURL=posts.service.js.map