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
var swap_data_1 = require("../../services/communicate/swap.data");
var CurLang_1 = require("../../Entities/CurLang");
var posts_service_1 = require("../../services/posts.service");
var pager_service_1 = require("../../services/pager.service");
var router_1 = require("@angular/router");
var UserControl = (function () {
    function UserControl(postsService, pagerService, router) {
        var _this = this;
        this.postsService = postsService;
        this.pagerService = pagerService;
        this.router = router;
        this.pager = {};
        swap_data_1.RouteTo.rout = 'administration/users-control';
        this.loc = CurLang_1.CurLang.locale;
        this.postsService.getData('admin/getUsersSize').subscribe(function (answer) {
            _this.sizeItems = answer;
            if (_this.sizeItems < 4) {
                _this.how = _this.sizeItems;
            }
            else {
                _this.how = 4;
            }
            _this.setPage(1);
        });
    }
    UserControl.prototype.setPage = function (page) {
        var _this = this;
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pager = this.pagerService.getPager(this.sizeItems, page, this.how);
        this.currentItems = [this.pager.startIndex + 1, this.pager.endIndex + 1];
        this.postsService.sendPost(this.currentItems, 'getRangeUsers').subscribe(function (answer) {
            _this.pagedItems = answer;
        });
    };
    UserControl.prototype.deleteUser = function (user) {
        var _this = this;
        var index = this.pagedItems.indexOf(user, 0);
        if (index > -1) {
            this.pagedItems.splice(index, 1);
        }
        this.postsService.sendPost(user.id, 'deleteUser').subscribe(function (ans) {
            _this.postsService.getData('getUsersSize').subscribe(function (answer) {
                _this.sizeItems = answer;
                if (_this.sizeItems < 4) {
                    _this.how = _this.sizeItems;
                }
                else {
                    _this.how = 4;
                }
                _this.setPage(1);
            });
        });
    };
    UserControl.prototype.goCurrentUser = function (user) {
        swap_data_1.PersonalUser.user = user;
        this.router.navigate(["personal"]);
    };
    return UserControl;
}());
UserControl = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "user-control",
        templateUrl: "user.control.html",
        styleUrls: ["user.control.css"]
    }),
    __metadata("design:paramtypes", [posts_service_1.PostsService, pager_service_1.PagerService, router_1.Router])
], UserControl);
exports.UserControl = UserControl;
//# sourceMappingURL=user.control.js.map