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
var core_1 = require("@angular/core");
var posts_service_1 = require("../services/posts.service");
var pager_service_1 = require("../services/pager.service");
var platform_browser_1 = require("@angular/platform-browser");
var CurLang_1 = require("../Entities/CurLang");
var swap_data_1 = require("../services/communicate/swap.data");
var router_1 = require("@angular/router");
var locale_auth_1 = require("../services/locale.auth");
var AddInfo_1 = require("../dto/AddInfo");
var FilterPosters_1 = require("../dto/FilterPosters");
var CatalogComponent = (function () {
    function CatalogComponent(auth, postsService, pagerService, sanitizer, swapData, router) {
        var _this = this;
        this.auth = auth;
        this.postsService = postsService;
        this.pagerService = pagerService;
        this.sanitizer = sanitizer;
        this.swapData = swapData;
        this.router = router;
        this.addInfo = new AddInfo_1.AddInfo();
        this.priceFrom = [];
        this.priceTo = [];
        this.yearFrom = [];
        this.yearTo = [];
        this.currency = "USD";
        this.options = [];
        this.currentSelection = 4;
        this.pager = {};
        this.pagedItemsBasket = [];
        swap_data_1.RouteTo.rout = 'catalog';
        this.loc = CurLang_1.CurLang.locale;
        this.postsService.getData('getAllPostersSize').subscribe(function (answer) {
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
        this.fillParametrs();
    }
    CatalogComponent.prototype.filterPosters = function (flag) {
        var _this = this;
        var filter = new FilterPosters_1.FilterPosters();
        // var mark=(document.getElementsByTagName("select")[1] as HTMLSelectElement);
        // if(mark.selectedIndex==0){
        //     filter.mark="";
        // }
        // else{
        //     filter.mark=mark.value;
        // }
        filter.orderField = 'date';
        var city = document.getElementsByTagName("select")[8];
        if (city.selectedIndex == 0) {
            filter.city = "";
        }
        else {
            filter.city = city.value;
        }
        if (flag == true) {
            this.postsService.sendPost(filter, 'getFilterPostersSize').subscribe(function (answer) {
                _this.sizeItems = answer;
                _this.options = [];
                _this.currentSelection = 4;
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
        return filter;
    };
    CatalogComponent.prototype.fillParametrs = function () {
        var _this = this;
        this.postsService.getData('getAddInfo').subscribe(function (ans) {
            _this.addInfo = ans;
        });
        for (var i = 500; i <= 60000;) {
            this.priceFrom.push(i);
            this.priceTo.push(i);
            i = i + 500;
        }
        for (var i = 1990; i <= 2017; i++) {
            this.yearFrom.push(i);
            this.yearTo.push(i);
        }
    };
    CatalogComponent.prototype.changeYearFrom = function (val) {
        var value = +val;
        this.yearTo = [];
        for (var i = 1990; i <= 2017; i++) {
            this.yearTo.push(i);
        }
        if (value >= 1990) {
            this.yearTo = [];
            for (var i = value; i <= 2017; i++) {
                this.yearTo.push(i);
            }
        }
    };
    CatalogComponent.prototype.changePriceFrom = function (val) {
        if (this.currency == 'USD') {
            this.priceTo = [];
            for (var i = 500; i <= 60000;) {
                this.priceTo.push(i);
                i = i + 500;
            }
            var value = +val;
            if (value >= 500) {
                this.priceTo = [];
                for (var i = value; i <= 60000;) {
                    this.priceTo.push(i);
                    i = i + 500;
                }
            }
        }
        else {
            this.priceTo = [];
            for (var i = 2000; i <= 200000;) {
                this.priceTo.push(i);
                i = i + 2000;
            }
            var value = +val;
            if (value >= 2000) {
                this.priceTo = [];
                for (var i = value; i <= 200000;) {
                    this.priceTo.push(i);
                    i = i + 2000;
                }
            }
        }
    };
    CatalogComponent.prototype.changeMark = function () {
        var _this = this;
        var mark = document.getElementsByTagName("select")[1];
        if (mark.selectedIndex == 0) {
            this.models = [];
        }
        else {
            for (var i = 0; i < this.addInfo.marks.length; i++) {
                if (mark.value == this.addInfo.marks[i].name) {
                    this.postsService.sendPost(this.addInfo.marks[i].id, 'getModels').subscribe(function (data) {
                        _this.models = data;
                    });
                }
            }
        }
    };
    CatalogComponent.prototype.setPage = function (page) {
        var _this = this;
        this.curPage = page;
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pager = this.pagerService.getPager(this.sizeItems, page, this.currentSelection);
        var filter = this.filterPosters(false);
        filter.from = this.pager.startIndex + 1;
        filter.to = this.pager.endIndex + 1;
        this.postsService.sendPost(filter, 'rangeFilterPosters').subscribe(function (answer) {
            _this.pagedItems = answer;
            for (var i = 0; i < _this.pagedItems.length; i++) {
                var mas = [_this.pagedItems[i].id, false];
                _this.pagedItemsBasket.push(mas);
            }
        });
    };
    CatalogComponent.prototype.setOption = function (sel) {
        var num = +sel;
        this.currentSelection = num;
        this.setPage(1);
    };
    CatalogComponent.prototype.getTransmission = function (tr) {
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
    CatalogComponent.prototype.getFuel = function (fl) {
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
    CatalogComponent.prototype.getImg = function (bytes) {
        var imgPath = "../../../images/noimage.png";
        if (bytes != null) {
            imgPath = 'data:image/jpg;base64,' + bytes;
        }
        return this.sanitizer.bypassSecurityTrustUrl(imgPath);
    };
    CatalogComponent.prototype.putToBasket = function (idPoster) {
        var inBasket = false;
        for (var i = 0; i < this.pagedItemsBasket.length; i++) {
            if (idPoster == this.pagedItemsBasket[i][0]) {
                if (this.pagedItemsBasket[i][1] == true) {
                    inBasket = true;
                }
                else {
                    this.pagedItemsBasket[i][1] = true;
                }
            }
        }
        if (!inBasket) {
            console.log("Добавляем в корзину");
        }
    };
    CatalogComponent.prototype.getBasketImg = function (idPoster) {
        for (var i = 0; i < this.pagedItemsBasket.length; i++) {
            if (idPoster == this.pagedItemsBasket[i][0]) {
                if (this.pagedItemsBasket[i][1] == false) {
                    return '../../images/to-basket.png';
                }
                else {
                    return '../../images/in-basket.png';
                }
            }
        }
    };
    CatalogComponent.prototype.getBasketTitle = function (idPoster) {
        for (var i = 0; i < this.pagedItemsBasket.length; i++) {
            if (idPoster == this.pagedItemsBasket[i][0]) {
                if (this.pagedItemsBasket[i][1] == false) {
                    return 'Добавить в корзину';
                }
                else {
                    return 'У вас в корзине';
                }
            }
        }
    };
    CatalogComponent.prototype.getAuthID = function () {
        var user = this.auth.getUser();
        var id;
        if (user == null || user.role == "ROLE_ADMIN") {
            id = 0;
        }
        else {
            id = user.id;
        }
        return id;
    };
    CatalogComponent.prototype.changeCurrency = function (flag) {
        if (this.currency == 'USD') {
            if (flag == true) {
                this.priceTo = [];
                this.priceFrom = [];
                this.currency = 'BLR';
                for (var i = 2000; i <= 200000;) {
                    this.priceFrom.push(i);
                    this.priceTo.push(i);
                    i = i + 2000;
                }
            }
            return 'BLR';
        }
        else {
            if (flag == true) {
                this.priceTo = [];
                this.priceFrom = [];
                this.currency = 'USD';
                for (var i = 500; i <= 60000;) {
                    this.priceFrom.push(i);
                    this.priceTo.push(i);
                    i = i + 500;
                }
            }
            return 'USD';
        }
    };
    return CatalogComponent;
}());
CatalogComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "catalog-component",
        templateUrl: "catalog.component.html",
        styleUrls: ["catalog.component.css", "radio.style.css"]
    }),
    __metadata("design:paramtypes", [locale_auth_1.LocaleAuth, posts_service_1.PostsService, pager_service_1.PagerService, platform_browser_1.DomSanitizer, swap_data_1.SwapData, router_1.Router])
], CatalogComponent);
exports.CatalogComponent = CatalogComponent;
//# sourceMappingURL=catalog.component.js.map