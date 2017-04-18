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
 * Created by Влад on 08.04.2017.
 */
var core_1 = require("@angular/core");
var swap_data_1 = require("../services/communicate/swap.data");
var posts_service_1 = require("../services/posts.service");
var router_1 = require("@angular/router");
var platform_browser_1 = require("@angular/platform-browser");
var CurrPoster_1 = require("../dto/CurrPoster");
var CurLang_1 = require("../Entities/CurLang");
var locale_auth_1 = require("../services/locale.auth");
var CurrentPoster = (function () {
    function CurrentPoster(swapData, postsService, router, sanitizer, auth) {
        var _this = this;
        this.swapData = swapData;
        this.postsService = postsService;
        this.router = router;
        this.sanitizer = sanitizer;
        this.auth = auth;
        this.newImage = false;
        this.imgPath = '../../images/noimage.png';
        this.poster = new CurrPoster_1.CurrPoster();
        this.curUser = false;
        this.isAdmin = false;
        this.loc = CurLang_1.CurLang.locale;
        swap_data_1.RouteTo.rout = 'poster';
        this.postsService.sendPost(swapData.personalAreaServ.getCurrentPosterID(), 'getCurrentPoster').subscribe(function (answer) {
            _this.poster = answer;
            if (_this.poster.user.id == _this.auth.getUser().id) {
                _this.curUser = true;
            }
            if (_this.auth.getUser().role == "ROLE_ADMIN") {
                _this.isAdmin = true;
            }
            _this.updatePoster();
        });
    }
    CurrentPoster.prototype.updatePoster = function () {
        if (this.curUser || this.isAdmin) {
            if (this.poster.currency == 'USD') {
                document.getElementsByClassName('cur')[0].selectedIndex = 0;
                document.getElementsByClassName("cur-input")[0].value = '' + this.poster.priceUsd;
            }
            else {
                document.getElementsByClassName('cur')[0].selectedIndex = 1;
                document.getElementsByClassName("cur-input")[0].value = '' + this.poster.priceBlr;
            }
            if (this.poster.transmission == "FRONT") {
                document.getElementsByClassName('transmission')[0].selectedIndex = 0;
            }
            else if (this.poster.transmission == "REAR") {
                document.getElementsByClassName('transmission')[0].selectedIndex = 1;
            }
            else {
                document.getElementsByClassName('transmission')[0].selectedIndex = 2;
            }
            if (this.poster.fuel == "PETROL") {
                document.getElementsByClassName('fuel')[0].selectedIndex = 0;
            }
            else if (this.poster.fuel == "DIESEL") {
                document.getElementsByClassName('fuel')[0].selectedIndex = 1;
            }
            else {
                document.getElementsByClassName('fuel')[0].selectedIndex = 2;
            }
            document.getElementsByClassName('dimension')[0].value = this.poster.dimension;
        }
        else {
            document.getElementsByClassName('cur')[0].className = "invisible";
            document.getElementsByClassName("cur-input")[0].className = "invisible";
            document.getElementsByClassName('transmission')[0].className = "invisible";
            document.getElementsByClassName('fuel')[0].className = "invisible";
            document.getElementsByClassName('dimension')[0].className = "invisible";
            var trans = document.getElementsByClassName("trans")[0];
            if (this.poster.transmission == "FRONT") {
                trans.innerHTML = "Передний";
            }
            else if (this.poster.transmission == "REAR") {
                trans.innerHTML = "Задний";
            }
            else if (this.poster.transmission == "FULL") {
                trans.innerHTML = "Полный";
            }
            var fuel = document.getElementsByClassName("fuel2")[0];
            if (this.poster.fuel == "PETROL") {
                fuel.innerHTML = "Бензин";
            }
            else if (this.poster.fuel == "DIESEL") {
                fuel.innerHTML = "Дизель";
            }
            else if (this.poster.fuel == "HYBRID") {
                fuel.innerHTML = "Гибридный";
            }
        }
        if (this.poster.file != null) {
            this.imgPath = 'data:image/jpg;base64,' + this.poster.file;
        }
    };
    CurrentPoster.prototype.saveChanges = function () {
        var _this = this;
        var transmition = document.getElementsByClassName('transmission')[0].selectedIndex;
        if (transmition == 0) {
            this.poster.transmission = "FRONT";
        }
        else if (transmition == 1) {
            this.poster.transmission = "REAR";
        }
        else {
            this.poster.transmission = "FULL";
        }
        var fuel = document.getElementsByClassName('fuel')[0].selectedIndex;
        if (fuel == 0) {
            this.poster.fuel = "PETROL";
        }
        else if (fuel == 1) {
            this.poster.fuel = "DIESEL";
        }
        else {
            this.poster.fuel = "HYBRID";
        }
        this.poster.dimension = document.getElementsByClassName('dimension')[0].value;
        var currency = document.getElementsByClassName('cur')[0].selectedIndex;
        if (currency == 0) {
            this.poster.currency = "USD";
            this.poster.priceUsd = +document.getElementsByClassName('cur-input')[0].value;
        }
        else {
            this.poster.currency = "BLR";
            this.poster.priceBlr = +document.getElementsByClassName('cur-input')[0].value;
        }
        this.poster.description = document.getElementsByTagName("textarea")[0].value;
        if (this.newImage) {
            this.poster.fileName = '' + this.poster.id;
            this.postsService.sendFile(this.fileData, 'saveFile').subscribe(function (ans) {
                console.log(ans);
            });
        }
        else {
            this.poster.fileName = '';
        }
        this.postsService.sendPost(this.poster, 'savePoster').subscribe(function (ans) {
            _this.exit();
        });
    };
    CurrentPoster.prototype.exit = function () {
        console.log('there');
        console.log(swap_data_1.RouteTo.routBeforeCurPoster);
        this.router.navigate([swap_data_1.RouteTo.routBeforeCurPoster]);
    };
    CurrentPoster.prototype.changeCurrency = function (val) {
        if (val == "$") {
            document.getElementsByClassName("cur-input")[0].value = '' + this.poster.priceUsd;
        }
        else
            document.getElementsByClassName("cur-input")[0].value = '' + this.poster.priceBlr;
    };
    CurrentPoster.prototype.selectFile = function (event) {
        var _this = this;
        var formData = new FormData();
        formData.append('file', event.target.files[0]);
        formData.append('name', '' + this.poster.id);
        this.fileData = formData;
        this.postsService.sendFile(formData, 'upload').subscribe(function (ans) {
            var bytes = ans;
            _this.imgPath = 'data:image/jpg;base64,' + bytes.bytes;
            _this.newImage = true;
        });
    };
    Object.defineProperty(CurrentPoster.prototype, "getImg", {
        get: function () {
            return this.sanitizer.bypassSecurityTrustUrl(this.imgPath);
        },
        enumerable: true,
        configurable: true
    });
    return CurrentPoster;
}());
CurrentPoster = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "current-poster",
        templateUrl: "current.poster.html",
        styleUrls: ["current.poster.css"]
    }),
    __metadata("design:paramtypes", [swap_data_1.SwapData, posts_service_1.PostsService, router_1.Router, platform_browser_1.DomSanitizer, locale_auth_1.LocaleAuth])
], CurrentPoster);
exports.CurrentPoster = CurrentPoster;
//# sourceMappingURL=current.poster.js.map