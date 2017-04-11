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
var posts_service_1 = require("../../services/posts.service");
var AddInfo_1 = require("../../dto/AddInfo");
var locale_auth_1 = require("../../services/locale.auth");
var router_1 = require("@angular/router");
var NewPoster_1 = require("../../dto/NewPoster");
var AddPoster = (function () {
    function AddPoster(swapData, postsService, auth, router) {
        var _this = this;
        this.swapData = swapData;
        this.postsService = postsService;
        this.auth = auth;
        this.router = router;
        this.years = [];
        this.loc = CurLang_1.CurLang.locale;
        this.addInfo = new AddInfo_1.AddInfo();
        this.models = [];
        swap_data_1.RouteTo.rout = "personal/addPoster";
        for (var i = 2017; i >= 1990; i--) {
            this.years.push(i);
        }
        this.postsService.getData('getAddInfo').subscribe(function (data) {
            _this.addInfo = data;
        });
    }
    AddPoster.prototype.getModels = function (value) {
        var _this = this;
        if (value != '') {
            var mark;
            for (var i = 0; i < this.addInfo.marks.length; i++) {
                if (this.addInfo.marks[i].name == value) {
                    mark = this.addInfo.marks[i];
                    break;
                }
            }
            this.postsService.sendPost(mark.id, 'getModels').subscribe(function (data) {
                _this.models = data;
            });
        }
        else
            this.models = [];
    };
    AddPoster.prototype.addPoster = function () {
        var _this = this;
        var newPoster = new NewPoster_1.NewPoster();
        newPoster.idUser = this.auth.getUser().id;
        var model = document.getElementsByTagName("select")[1].value;
        for (var i = 0; i < this.models.length; i++) {
            if (this.models[i].name == model) {
                newPoster.idModel = this.models[i].id;
                break;
            }
        }
        var city = document.getElementsByTagName("select")[4].value;
        for (var i = 0; i < this.addInfo.cities.length; i++) {
            if (this.addInfo.cities[i].name == city) {
                newPoster.idCity = this.addInfo.cities[i].id;
                break;
            }
        }
        newPoster.anotherCity = document.getElementsByTagName("input")[1].value;
        newPoster.year = document.getElementsByTagName("select")[2].value;
        var currency = document.getElementsByTagName("select")[3].value;
        if (currency == 'бел.руб' || currency == 'BLR') {
            currency = 'BLR';
        }
        else
            currency = 'USD';
        newPoster.currency = currency;
        newPoster.cost = +document.getElementsByTagName("input")[0].value;
        newPoster.description = document.getElementsByTagName("textarea")[0].value;
        this.postsService.sendPost(newPoster, 'addNewPoster').subscribe(function (answer) {
            _this.swapData.personalAreaServ.setCurrentPosterID(answer);
            _this.router.navigate(['poster']);
        });
    };
    return AddPoster;
}());
AddPoster = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "add-poster",
        templateUrl: "add.poster.html",
        styleUrls: ["add.poster.css"]
    }),
    __metadata("design:paramtypes", [swap_data_1.SwapData, posts_service_1.PostsService, locale_auth_1.LocaleAuth, router_1.Router])
], AddPoster);
exports.AddPoster = AddPoster;
//# sourceMappingURL=add.poster.js.map