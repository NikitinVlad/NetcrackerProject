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
var swap_data_1 = require("../../services/communicate/swap.data");
var posts_service_1 = require("../../services/posts.service");
var pager_service_1 = require("../../services/pager.service");
var router_1 = require("@angular/router");
var locale_auth_1 = require("../../services/locale.auth");
var platform_browser_1 = require("@angular/platform-browser");
var CurLang_1 = require("../../Entities/CurLang");
var BasketCount_1 = require("../../dto/BasketCount");
var BasketComponent = (function () {
    function BasketComponent(postsService, pagerService, router, swapData, auth, sanitizer) {
        var _this = this;
        this.postsService = postsService;
        this.pagerService = pagerService;
        this.router = router;
        this.swapData = swapData;
        this.auth = auth;
        this.sanitizer = sanitizer;
        this.modal = false;
        this.options = [];
        this.currentSelection = 4;
        this.pager = {};
        this.basketCount = new BasketCount_1.BasketCount();
        swap_data_1.RouteTo.rout = 'personal/basket';
        this.loc = CurLang_1.CurLang.locale;
        this.postsService.sendPost(swap_data_1.PersonalUser.user.id, 'getBasketSize').subscribe(function (answer) {
            _this.basketCount = answer;
            _this.sizeItems = _this.basketCount.size;
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
    BasketComponent.prototype.setPage = function (page) {
        var _this = this;
        this.curPage = page;
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pager = this.pagerService.getPager(this.sizeItems, page, this.currentSelection);
        this.currentItems = [this.pager.startIndex + 1, this.pager.endIndex + 1, swap_data_1.PersonalUser.user.id];
        this.postsService.sendPost(this.currentItems, 'getRangePostersBasket').subscribe(function (answer) {
            _this.pagedItems = answer;
        });
    };
    BasketComponent.prototype.setOption = function (sel) {
        var num = +sel;
        this.currentSelection = num;
        this.setPage(1);
    };
    BasketComponent.prototype.getTransmission = function (tr) {
        if (tr == "FRONT") {
            return this.loc.pers_front + ", ";
        }
        else if (tr == "REAR") {
            return this.loc.pers_back + ", ";
        }
        else if (tr == "FULL") {
            return this.loc.pers_full + ", ";
        }
        else
            return "";
    };
    BasketComponent.prototype.getFuel = function (fl) {
        if (fl == "PETROL") {
            return this.loc.pers_petrol + ", ";
        }
        else if (fl == "DIESEL") {
            return this.loc.pers_diesel + ", ";
        }
        else if (fl == "HYBRID") {
            return this.loc.pers_hybrid + ", ";
        }
        else
            return "";
    };
    BasketComponent.prototype.getImg = function (bytes) {
        var imgPath = "../../../images/noimage.png";
        if (bytes != null) {
            imgPath = 'data:image/jpg;base64,' + bytes;
        }
        return this.sanitizer.bypassSecurityTrustUrl(imgPath);
    };
    BasketComponent.prototype.goPoster = function (id) {
        this.swapData.personalAreaServ.setCurrentPosterID(id);
        swap_data_1.RouteTo.routBeforeCurPoster = "personal/basket";
        this.router.navigate(["poster"]);
    };
    BasketComponent.prototype.deletePoster = function (item) {
        var _this = this;
        var index = this.pagedItems.indexOf(item, 0);
        if (index > -1) {
            this.pagedItems.splice(index, 1);
        }
        this.postsService.sendPost(item.id, 'deleteFromBasket').subscribe(function (ans) {
            _this.postsService.sendPost(swap_data_1.PersonalUser.user.id, 'getBasketSize').subscribe(function (answer) {
                _this.basketCount = answer;
                _this.options = [];
                _this.sizeItems = _this.basketCount.size;
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
    BasketComponent.prototype.closeModal = function () {
        this.modal = false;
    };
    BasketComponent.prototype.buyAll = function () {
        var _this = this;
        this.postsService.sendPost(this.auth.getUser().id, 'buyCars').subscribe(function (answer) {
            if (answer == _this.auth.getUser().id) {
                _this.modal = true;
                _this.priceInModal = _this.basketCount.priceUsd;
                _this.postsService.sendPost(_this.auth.getUser().id, 'getBasketSize').subscribe(function (answer) {
                    _this.basketCount = answer;
                    _this.options = [];
                    _this.sizeItems = _this.basketCount.size;
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
            }
        });
    };
    return BasketComponent;
}());
BasketComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "basket",
        templateUrl: "basket.component.html",
        styleUrls: ["basket.component.css", "modal.window.css"]
    }),
    __metadata("design:paramtypes", [posts_service_1.PostsService, pager_service_1.PagerService, router_1.Router, swap_data_1.SwapData, locale_auth_1.LocaleAuth, platform_browser_1.DomSanitizer])
], BasketComponent);
exports.BasketComponent = BasketComponent;
//# sourceMappingURL=basket.component.js.map