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
var swap_data_1 = require("../../services/communicate/swap.data");
var CurLang_1 = require("../../Entities/CurLang");
var AddPoster = (function () {
    function AddPoster(swapData) {
        this.swapData = swapData;
        this.years = [];
        this.loc = CurLang_1.CurLang.locale;
        for (var i = 2017; i >= 1990; i--) {
            this.years.push(i);
        }
        this.swapData.personalAreaServ.setCurrentPage(4);
    }
    return AddPoster;
}());
AddPoster = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "add-poster",
        templateUrl: "add.poster.html",
        styleUrls: ["add.poster.css"]
    }),
    __metadata("design:paramtypes", [swap_data_1.SwapData])
], AddPoster);
exports.AddPoster = AddPoster;
//# sourceMappingURL=add.poster.js.map