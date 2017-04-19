"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var main_page_1 = require("./mainPage/main.page");
var registration_component_1 = require("./registrationComponent/registration.component");
var login_component_1 = require("./loginComponent/login.component");
var personal_area_1 = require("./personalArea/personal.area");
var help_component_1 = require("./personalArea/helpComponent/help.component");
var office_component_1 = require("./personalArea/officeComponent/office.component");
var poster_component_1 = require("./personalArea/postersComponent/poster.component");
var basket_component_1 = require("./personalArea/basketComponent/basket.component");
var add_poster_1 = require("./personalArea/addPosterComponent/add.poster");
var current_poster_1 = require("./currentPosterComponent/current.poster");
var catalog_component_1 = require("./catalogComponent/catalog.component");
var admin_component_1 = require("./adminComponent/admin.component");
var user_control_1 = require("./adminComponent/userControl/user.control");
var model_control_1 = require("./adminComponent/modelControl/model.control");
exports.routes = [
    { path: "main", component: main_page_1.MainPage },
    { path: "registration", component: registration_component_1.RegistrationComponent },
    { path: "login", component: login_component_1.LoginComponent },
    { path: "", redirectTo: "main", pathMatch: "full" },
    { path: "personal", component: personal_area_1.PersonalArea,
        children: [
            { path: '', redirectTo: 'profile', pathMatch: 'full' },
            { path: 'profile', component: office_component_1.OfficeComponent },
            { path: 'posters', component: poster_component_1.PosterComponent },
            { path: 'basket', component: basket_component_1.BasketComponent },
            { path: 'addPoster', component: add_poster_1.AddPoster },
        ]
    },
    { path: "help", component: help_component_1.HelpComponent },
    { path: 'poster', component: current_poster_1.CurrentPoster },
    { path: 'catalog', component: catalog_component_1.CatalogComponent },
    { path: 'catalog', component: catalog_component_1.CatalogComponent },
    { path: 'administration', component: admin_component_1.AdminComponent,
        children: [
            { path: '', redirectTo: 'users-control', pathMatch: 'full' },
            { path: 'users-control', component: user_control_1.UserControl },
            { path: 'models-control', component: model_control_1.ModelControl }
        ]
    },
];
//# sourceMappingURL=app.routes.js.map