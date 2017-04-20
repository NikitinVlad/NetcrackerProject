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
 * Created by Влад on 17.03.2017.
 */
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var core_2 = require("angular2-google-maps/core");
var forms_1 = require("@angular/forms");
var core_3 = require("@angular/core");
var GoogleMap = (function () {
    function GoogleMap(router, mapsAPILoader, ngZone) {
        this.router = router;
        this.mapsAPILoader = mapsAPILoader;
        this.ngZone = ngZone;
        this.title = "Автохаус «СмартАвто» ждет вас";
        this.number1 = "376 60 52";
        this.number2 = "668 60 57";
        this.number3 = "686 60 57";
        this.adress = "проспект Победителей 1, Минск, Беларусь";
        this.time1 = "Пн-пт: c 7:00 до 23:00";
        this.timeWeekend = "Сб-вс и праздничные дни: c 9:00 до 21:00";
        this.email = "smart-avto@mail.ru";
    }
    GoogleMap.prototype.clickMarker = function () {
        this.router.navigate(["main"]);
    };
    GoogleMap.prototype.ngOnInit = function () {
        var _this = this;
        this.searchControl = new forms_1.FormControl();
        // this.setCurrentPosition();
        var addr = document.getElementsByClassName('addr')[0];
        this.mapsAPILoader.load().then(function () {
            var autocomplete = new google.maps.places.Autocomplete(_this.searchElementRef.nativeElement, {
                types: ["geocode"]
            });
            autocomplete.addListener("place_changed", function () {
                _this.ngZone.run(function () {
                    //get the place result
                    var place = autocomplete.getPlace();
                    //verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }
                    //set latitude, longitude and zoom
                    console.log('there');
                    _this.lat = place.geometry.location.lat();
                    _this.lng = place.geometry.location.lng();
                    _this.zoom = 12;
                });
            });
        });
        if (this.searchElementRef.nativeElement.value == "") {
            this.lat = 53.905377;
            this.lng = 27.552047;
            this.zoom = 17;
        }
    };
    GoogleMap.prototype.go = function () {
        this.lat = 53.905377;
        this.lng = 27.552047;
        this.zoom = 17;
    };
    return GoogleMap;
}());
__decorate([
    core_3.ViewChild("search"),
    __metadata("design:type", core_1.ElementRef)
], GoogleMap.prototype, "searchElementRef", void 0);
GoogleMap = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'google-map',
        templateUrl: 'google.map.html',
        styleUrls: ['google.map.css']
    }),
    __metadata("design:paramtypes", [router_1.Router, core_2.MapsAPILoader, core_1.NgZone])
], GoogleMap);
exports.GoogleMap = GoogleMap;
//# sourceMappingURL=google.map.component.js.map