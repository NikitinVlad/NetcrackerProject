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
 * Created by Влад on 19.04.2017.
 */
var core_1 = require("@angular/core");
var CurLang_1 = require("../Entities/CurLang");
var swap_data_1 = require("../services/communicate/swap.data");
var AdminComponent = (function () {
    function AdminComponent() {
        this.loc = CurLang_1.CurLang.locale;
        swap_data_1.RouteTo.rout = 'administration';
    }
    return AdminComponent;
}());
AdminComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "admin-component",
        templateUrl: "admin.component.html",
        styleUrls: ["admin.component.css"]
    }),
    __metadata("design:paramtypes", [])
], AdminComponent);
exports.AdminComponent = AdminComponent;
//# sourceMappingURL=admin.component.js.map