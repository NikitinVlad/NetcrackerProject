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
var pager_service_1 = require("../../services/pager.service");
var posts_service_1 = require("../../services/posts.service");
var router_1 = require("@angular/router");
var swap_data_1 = require("../../services/communicate/swap.data");
var CurLang_1 = require("../../Entities/CurLang");
var PosterComponent = (function () {
    function PosterComponent(postsService, pagerService, router, swapData) {
        var _this = this;
        this.postsService = postsService;
        this.pagerService = pagerService;
        this.router = router;
        this.swapData = swapData;
        this.options = [];
        this.pager = {};
        this.loc = CurLang_1.CurLang.locale;
        swapData.personalAreaServ.setCurrentPage(2);
        console.log("constructor");
        this.currentSelection = this.swapData.personalAreaServ.getOptionSelected();
        this.postsService.getData('getCitiesSize').subscribe(function (answer) {
            _this.sizeItems = answer;
            if (_this.sizeItems > 20) {
                for (var i = 0; i < 20; i++) {
                    _this.options.push(i + 1);
                }
            }
            else {
                for (var i = 0; i < _this.sizeItems; i++) {
                    _this.options.push(i + 1);
                }
            }
            _this.setPage(1);
        });
    }
    PosterComponent.prototype.setPage = function (page) {
        var _this = this;
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pager = this.pagerService.getPager(this.sizeItems, page, this.currentSelection);
        this.currentItems = [this.pager.startIndex + 1, this.pager.endIndex + 1, 'name'];
        this.postsService.sendPost(this.currentItems, 'getRangeCities').subscribe(function (answer) {
            _this.pagedItems = answer;
        });
    };
    PosterComponent.prototype.setOption = function (sel) {
        var num = +sel;
        this.swapData.personalAreaServ.setOptionSelected(num);
        this.router.navigate(["help"]);
    };
    return PosterComponent;
}());
PosterComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "posters",
        templateUrl: "poster.component.html",
        styleUrls: ["poster.component.css"]
    }),
    __metadata("design:paramtypes", [posts_service_1.PostsService, pager_service_1.PagerService, router_1.Router, swap_data_1.SwapData])
], PosterComponent);
exports.PosterComponent = PosterComponent;
//# sourceMappingURL=poster.component.js.map