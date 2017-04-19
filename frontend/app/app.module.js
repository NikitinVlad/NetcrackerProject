"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var app_component_1 = require("./app.component");
var router_1 = require("@angular/router");
var main_page_1 = require("./mainPage/main.page");
var app_routes_1 = require("./app.routes");
var registration_component_1 = require("./registrationComponent/registration.component");
var posts_service_1 = require("./services/posts.service");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var angular2_toaster_1 = require("angular2-toaster");
var login_component_1 = require("./loginComponent/login.component");
var locale_auth_1 = require("./services/locale.auth");
var personal_area_1 = require("./personalArea/personal.area");
var poster_component_1 = require("./personalArea/postersComponent/poster.component");
var basket_component_1 = require("./personalArea/basketComponent/basket.component");
var office_component_1 = require("./personalArea/officeComponent/office.component");
var pager_service_1 = require("./services/pager.service");
var swap_data_1 = require("./services/communicate/swap.data");
var help_component_1 = require("./personalArea/helpComponent/help.component");
var sturtup_service_1 = require("./services/sturtup.service");
var add_poster_1 = require("./personalArea/addPosterComponent/add.poster");
var current_poster_1 = require("./currentPosterComponent/current.poster");
var catalog_component_1 = require("./catalogComponent/catalog.component");
var admin_component_1 = require("./adminComponent/admin.component");
var user_control_1 = require("./adminComponent/userControl/user.control");
var model_control_1 = require("./adminComponent/modelControl/model.control");
function startupServiceFactory(startupService) {
    return function () { return startupService.load(); };
}
exports.startupServiceFactory = startupServiceFactory;
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, forms_1.ReactiveFormsModule, http_1.HttpModule, angular2_toaster_1.ToasterModule, router_1.RouterModule.forRoot(app_routes_1.routes)],
        declarations: [app_component_1.AppComponent, main_page_1.MainPage, registration_component_1.RegistrationComponent, catalog_component_1.CatalogComponent, login_component_1.LoginComponent, personal_area_1.PersonalArea, poster_component_1.PosterComponent, basket_component_1.BasketComponent, office_component_1.OfficeComponent, help_component_1.HelpComponent,
            add_poster_1.AddPoster, current_poster_1.CurrentPoster, admin_component_1.AdminComponent, user_control_1.UserControl, model_control_1.ModelControl],
        providers: [sturtup_service_1.StartupService, posts_service_1.PostsService, locale_auth_1.LocaleAuth, pager_service_1.PagerService, swap_data_1.SwapData, { provide: core_1.APP_INITIALIZER,
                useFactory: startupServiceFactory,
                deps: [sturtup_service_1.StartupService],
                multi: true }],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map