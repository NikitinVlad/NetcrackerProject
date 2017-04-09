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
var CurrentPoster = (function () {
    function CurrentPoster(swapData, postsService, router, sanitizer) {
        this.swapData = swapData;
        this.postsService = postsService;
        this.router = router;
        this.sanitizer = sanitizer;
        this.imgPath = '../../images/noimage.png';
        swap_data_1.RouteTo.rout = 'poster';
    }
    CurrentPoster.prototype.selectFile = function (event) {
        var _this = this;
        var formData = new FormData();
        formData.append('file', event.target.files[0]);
        formData.append('name', "25_34");
        this.fileData = formData;
        this.postsService.sendFile(formData, 'upload').subscribe(function (ans) {
            var bytes = ans;
            _this.imgPath = 'data:image/png;base64,' + bytes.bytes;
        });
    };
    Object.defineProperty(CurrentPoster.prototype, "getImg", {
        get: function () {
            return this.sanitizer.bypassSecurityTrustUrl(this.imgPath);
        },
        enumerable: true,
        configurable: true
    });
    CurrentPoster.prototype.saveChanges = function () {
        this.postsService.sendFile(this.fileData, 'save').subscribe(function (ans) {
            console.log(ans);
        });
    };
    return CurrentPoster;
}());
CurrentPoster = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "current-poster",
        templateUrl: "current.poster.html",
        styleUrls: ["current.poster.css"]
    }),
    __metadata("design:paramtypes", [swap_data_1.SwapData, posts_service_1.PostsService, router_1.Router, platform_browser_1.DomSanitizer])
], CurrentPoster);
exports.CurrentPoster = CurrentPoster;
//# sourceMappingURL=current.poster.js.map