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
var posts_service_1 = require("../../services/posts.service");
var Model_1 = require("../../Entities/Model");
var ModelControl = (function () {
    function ModelControl(postsService) {
        var _this = this;
        this.postsService = postsService;
        this.error = false;
        this.success = false;
        this.marks = [];
        this.models = [];
        this.postsService.getData('getAddInfo').subscribe(function (ans) {
            _this.marks = ans.marks;
        });
    }
    ModelControl.prototype.checkField = function () {
        if (document.getElementsByTagName("input")[0].value.length > 0) {
            return true;
        }
        else {
            this.error = true;
            return false;
        }
    };
    ModelControl.prototype.changeMark = function () {
        var _this = this;
        var mark = document.getElementsByTagName("select")[0];
        if (mark.selectedIndex == 0) {
            this.models = [];
            document.getElementsByTagName("input")[0].disabled = true;
            document.getElementsByTagName("input")[1].disabled = true;
        }
        else {
            document.getElementsByTagName("input")[0].disabled = false;
            document.getElementsByTagName("input")[1].disabled = false;
            document.getElementsByTagName("input")[0].focus();
            for (var i = 0; i < this.marks.length; i++) {
                if (mark.value == this.marks[i].name) {
                    this.postsService.sendPost(this.marks[i].id, 'getModels').subscribe(function (data) {
                        _this.models = data;
                    });
                }
            }
        }
    };
    ModelControl.prototype.addModel = function () {
        var _this = this;
        if (this.checkField()) {
            var mark = document.getElementsByTagName("select")[0];
            var name = document.getElementsByTagName("input")[0].value;
            var id;
            for (var i = 0; i < this.marks.length; i++) {
                if (mark.value == this.marks[i].name) {
                    id = this.marks[i].id;
                }
            }
            var model = new Model_1.Model(id, name);
            this.postsService.sendPost(model, 'addModel').subscribe(function (data) {
                if (data == 0) {
                    _this.error = true;
                }
                else {
                    _this.success = true;
                    _this.postsService.sendPost(id, 'getModels').subscribe(function (data) {
                        _this.models = data;
                    });
                    document.getElementsByTagName("input")[0].disabled = true;
                    document.getElementsByTagName("input")[1].disabled = true;
                }
            });
        }
    };
    ModelControl.prototype.noError = function () {
        this.error = false;
        this.success = false;
    };
    return ModelControl;
}());
ModelControl = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "model-control",
        templateUrl: "model.control.html",
        styleUrls: ["model.control.css"]
    }),
    __metadata("design:paramtypes", [posts_service_1.PostsService])
], ModelControl);
exports.ModelControl = ModelControl;
//# sourceMappingURL=model.control.js.map