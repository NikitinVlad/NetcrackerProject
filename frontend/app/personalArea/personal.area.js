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
 * Created by Влад on 02.04.2017.
 */
var core_1 = require("@angular/core");
var swap_data_1 = require("../services/communicate/swap.data");
var CurLang_1 = require("../Entities/CurLang");
var locale_auth_1 = require("../services/locale.auth");
var router_1 = require("@angular/router");
var PersonalArea = (function () {
    function PersonalArea(swapData, localeAuth, router) {
        this.swapData = swapData;
        this.localeAuth = localeAuth;
        this.router = router;
        this.newPoster = this.swapData.personalAreaServ.getNewPoster();
        this.loc = CurLang_1.CurLang.locale;
        this.user = this.localeAuth.getUser();
        if (this.user.role == "ROLE_ADMIN") {
            this.sessionUser = swap_data_1.PersonalUser.user;
            if (this.sessionUser.role == "ROLE_ADMIN") {
                this.router.navigate(['administration']);
            }
        }
        swap_data_1.RouteTo.rout = 'personal';
    }
    PersonalArea.prototype.addPoster = function () {
        this.swapData.personalAreaServ.setNewPoster(true);
        this.newPoster = true;
    };
    PersonalArea.prototype.closeNewAdd = function () {
        this.swapData.personalAreaServ.setNewPoster(false);
        this.newPoster = false;
    };
    return PersonalArea;
}());
PersonalArea = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "personal",
        templateUrl: "personal.area.html",
        styleUrls: ["personal.area.css"]
    }),
    __metadata("design:paramtypes", [swap_data_1.SwapData, locale_auth_1.LocaleAuth, router_1.Router])
], PersonalArea);
exports.PersonalArea = PersonalArea;
//# sourceMappingURL=personal.area.js.map