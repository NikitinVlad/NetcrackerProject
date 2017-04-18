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
 * Created by Влад on 06.04.2017.
 */
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/toPromise");
require("rxjs/add/operator/catch");
var CurLang_1 = require("../Entities/CurLang");
var Lang_1 = require("../dto/Lang");
var User_1 = require("../Entities/User");
var swap_data_1 = require("./communicate/swap.data");
var StartupService = (function () {
    function StartupService(http) {
        this.http = http;
    }
    StartupService.prototype.load = function () {
        var bodyString = JSON.stringify(new Lang_1.Lang(CurLang_1.CurLang.lang).lang);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        if (localStorage.getItem('currentUser')) {
            var user;
            user = Object.assign(new User_1.User("", "", "", ""), JSON.parse(localStorage.getItem('currentUser')));
            swap_data_1.PersonalUser.user = user;
        }
        return this.http.post('http://localhost:8080/messageBundle', bodyString, options)
            .map(function (res) { return res.json(); })
            .toPromise()
            .then(function (data) { return CurLang_1.CurLang.locale = data; })
            .catch(function (err) { return Promise.resolve(); });
    };
    return StartupService;
}());
StartupService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], StartupService);
exports.StartupService = StartupService;
//# sourceMappingURL=sturtup.service.js.map