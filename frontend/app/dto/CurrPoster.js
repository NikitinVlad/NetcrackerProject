"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = require("../Entities/User");
/**
 * Created by Влад on 10.04.2017.
 */
var CurrPoster = (function () {
    function CurrPoster() {
        this.id = 0;
        this.markName = '';
        this.modelName = '';
        this.year = 0;
        this.city = '';
        this.description = '';
        this.transmission = '';
        this.fuel = '';
        this.dimension = '';
        this.priceUsd = 0;
        this.priceBlr = 0;
        this.currency = '';
        this.date = '';
        this.file = [];
        this.fileName = "";
        this.user = new User_1.User("", "", "", "");
    }
    return CurrPoster;
}());
exports.CurrPoster = CurrPoster;
//# sourceMappingURL=CurrPoster.js.map