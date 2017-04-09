"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * Created by Влад on 02.04.2017.
 */
var SwapData = (function () {
    function SwapData() {
        this.personalAreaServ = new PersonalAreaServ();
    }
    return SwapData;
}());
SwapData = __decorate([
    core_1.Injectable()
], SwapData);
exports.SwapData = SwapData;
var PersonalAreaServ = (function () {
    function PersonalAreaServ() {
    }
    PersonalAreaServ.prototype.setOptionSelected = function (num) {
        PersonalAreaServ.optionSelected = num;
    };
    PersonalAreaServ.prototype.getOptionSelected = function () {
        return PersonalAreaServ.optionSelected;
    };
    PersonalAreaServ.prototype.getNewPoster = function () {
        return PersonalAreaServ.newPoster;
    };
    PersonalAreaServ.prototype.setNewPoster = function (val) {
        PersonalAreaServ.newPoster = val;
    };
    return PersonalAreaServ;
}());
PersonalAreaServ.newPoster = true;
PersonalAreaServ.optionSelected = 4;
var RouteTo = (function () {
    function RouteTo() {
    }
    return RouteTo;
}());
exports.RouteTo = RouteTo;
//# sourceMappingURL=swap.data.js.map