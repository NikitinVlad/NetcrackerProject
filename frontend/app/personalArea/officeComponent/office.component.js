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
var swap_data_1 = require("../../services/communicate/swap.data");
var forms_1 = require("@angular/forms");
var CurLang_1 = require("../../Entities/CurLang");
var posts_service_1 = require("../../services/posts.service");
var OfficeComponent = (function () {
    function OfficeComponent(swapData, fb, postsService) {
        this.swapData = swapData;
        this.postsService = postsService;
        this.valid = true;
        this.success = false;
        swap_data_1.RouteTo.rout = 'personal/profile';
        this.loc = CurLang_1.CurLang.locale;
        var NAME_REGEXP = '[A-Za-zА-Яа-я]+';
        var EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.complexForm = fb.group({
            'name': [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern(NAME_REGEXP)])],
            'pass': [null, forms_1.Validators.compose([forms_1.Validators.minLength(4), forms_1.Validators.maxLength(20)])],
            'email': [null, forms_1.Validators.compose([forms_1.Validators.minLength(5), forms_1.Validators.pattern(EMAIL_REGEXP), forms_1.Validators.maxLength(30)])]
        });
        this.fillFields();
    }
    OfficeComponent.prototype.fillFields = function () {
        this.postsService.sendPost(swap_data_1.PersonalUser.user.id, "findUserByID").subscribe(function (answer) {
            document.getElementsByTagName("input")[0].value = answer.name;
            document.getElementsByTagName("input")[1].value = answer.login;
            document.getElementsByTagName("input")[2].value = answer.pass;
            document.getElementsByTagName("input")[3].value = answer.email;
        });
    };
    OfficeComponent.prototype.submitForm = function (form) {
        var _this = this;
        var user = swap_data_1.PersonalUser.user;
        user.email = document.getElementsByTagName("input")[3].value;
        user.name = document.getElementsByTagName("input")[0].value;
        user.pass = document.getElementsByTagName("input")[2].value;
        console.log(user);
        this.postsService.sendPost(user, 'updateUser').subscribe(function (answer) {
            if (answer == 0) {
                _this.valid = false;
            }
            else {
                _this.success = true;
                document.getElementsByTagName("input")[0].value = user.name;
                document.getElementsByTagName("input")[2].value = user.pass;
                document.getElementsByTagName("input")[3].value = user.email;
                swap_data_1.PersonalUser.user = user;
                for (var i = 0; i < 4; i++) {
                    document.getElementsByTagName("input")[0].disabled = true;
                }
            }
        });
    };
    OfficeComponent.prototype.edit = function (i) {
        document.getElementsByTagName("input")[i].disabled = false;
        document.getElementsByTagName("input")[i].value = "";
        document.getElementsByTagName("input")[i].focus();
    };
    OfficeComponent.prototype.blur = function (i) {
        if (document.getElementsByTagName("input")[i].value == "") {
            if (i == 0) {
                document.getElementsByTagName("input")[i].value = swap_data_1.PersonalUser.user.name;
            }
            else if (i == 2) {
                document.getElementsByTagName("input")[i].value = swap_data_1.PersonalUser.user.pass;
            }
            else {
                document.getElementsByTagName("input")[i].value = swap_data_1.PersonalUser.user.email;
            }
        }
    };
    return OfficeComponent;
}());
OfficeComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "office",
        templateUrl: "office.component.html",
        styleUrls: ["office.component.css"]
    }),
    __metadata("design:paramtypes", [swap_data_1.SwapData, forms_1.FormBuilder, posts_service_1.PostsService])
], OfficeComponent);
exports.OfficeComponent = OfficeComponent;
//# sourceMappingURL=office.component.js.map