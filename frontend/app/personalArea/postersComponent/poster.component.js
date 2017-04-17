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
var locale_auth_1 = require("../../services/locale.auth");
var platform_browser_1 = require("@angular/platform-browser");
var PosterComponent = (function () {
    function PosterComponent(postsService, pagerService, router, swapData, auth, sanitizer) {
        var _this = this;
        this.postsService = postsService;
        this.pagerService = pagerService;
        this.router = router;
        this.swapData = swapData;
        this.auth = auth;
        this.sanitizer = sanitizer;
        this.options = [];
        this.currentSelection = 4;
        this.pager = {};
        swap_data_1.RouteTo.rout = 'personal/posters';
        this.loc = CurLang_1.CurLang.locale;
        this.postsService.sendPost(this.auth.getUser().id, 'getPostersSize').subscribe(function (answer) {
            console.log(answer);
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
                if (_this.sizeItems < _this.currentSelection)
                    _this.currentSelection = _this.sizeItems;
            }
            _this.setPage(1);
        });
    }
    PosterComponent.prototype.setPage = function (page) {
        var _this = this;
        this.curPage = page;
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pager = this.pagerService.getPager(this.sizeItems, page, this.currentSelection);
        this.currentItems = [this.pager.startIndex + 1, this.pager.endIndex + 1, 'date', this.auth.getUser().id];
        console.log(this.currentItems);
        this.postsService.sendPost(this.currentItems, 'getRangePosters').subscribe(function (answer) {
            _this.pagedItems = answer;
            console.log(answer);
        });
    };
    PosterComponent.prototype.setOption = function (sel) {
        var num = +sel;
        this.currentSelection = num;
        this.setPage(1);
    };
    PosterComponent.prototype.getTransmission = function (tr) {
        if (tr == "FRONT") {
            return "привод:передний, ";
        }
        else if (tr == "REAR") {
            return "привод:задний, ";
        }
        else if (tr == "FULL") {
            return "привод:полный, ";
        }
        else
            return "";
    };
    PosterComponent.prototype.getFuel = function (fl) {
        if (fl == "PETROL") {
            return "бензин, ";
        }
        else if (fl == "DIESEL") {
            return "дизель, ";
        }
        else if (fl == "HYBRID") {
            return "гибрид, ";
        }
        else
            return "";
    };
    PosterComponent.prototype.getImg = function (bytes) {
        var imgPath = "../../../images/noimage.png";
        if (bytes != null) {
            imgPath = 'data:image/jpg;base64,' + bytes;
        }
        return this.sanitizer.bypassSecurityTrustUrl(imgPath);
    };
    PosterComponent.prototype.goPoster = function (id) {
        this.swapData.personalAreaServ.setCurrentPosterID(id);
        swap_data_1.RouteTo.routBeforeCurPoster = "personal/posters";
        this.router.navigate(["poster"]);
    };
    PosterComponent.prototype.deletePoster = function (item) {
        var _this = this;
        var index = this.pagedItems.indexOf(item, 0);
        if (index > -1) {
            this.pagedItems.splice(index, 1);
        }
        this.postsService.sendPost(item.id, 'deletePoster').subscribe(function (ans) {
            _this.postsService.sendPost(_this.auth.getUser().id, 'getPostersSize').subscribe(function (answer) {
                _this.options = [];
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
                    if (_this.sizeItems < _this.currentSelection)
                        _this.currentSelection = _this.sizeItems;
                }
                _this.setPage(_this.curPage);
            });
        });
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
    __metadata("design:paramtypes", [posts_service_1.PostsService, pager_service_1.PagerService, router_1.Router, swap_data_1.SwapData, locale_auth_1.LocaleAuth, platform_browser_1.DomSanitizer])
], PosterComponent);
exports.PosterComponent = PosterComponent;
//# sourceMappingURL=poster.component.js.map