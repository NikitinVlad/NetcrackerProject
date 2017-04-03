"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var main_page_1 = require("./mainPage/main.page");
var registration_component_1 = require("./registrationComponent/registration.component");
var login_component_1 = require("./loginComponent/login.component");
var personal_area_1 = require("./personalArea/personal.area");
var help_component_1 = require("./personalArea/helpComponent/help.component");
exports.routes = [
    { path: "main", component: main_page_1.MainPage },
    { path: "registration", component: registration_component_1.RegistrationComponent },
    { path: "login", component: login_component_1.LoginComponent },
    { path: "", redirectTo: "main", pathMatch: "full" },
    { path: "personal", component: personal_area_1.PersonalArea },
    { path: "help", component: help_component_1.HelpComponent }
];
//# sourceMappingURL=app.routes.js.map