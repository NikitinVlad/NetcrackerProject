import { Component } from '@angular/core';
import {AppComponent} from "../app.component";
import {Router} from "@angular/router";
import {ToasterContainerComponent, ToasterService, Toast,ToasterConfig} from 'angular2-toaster';
import {LocaleAuth} from "../services/locale.auth";

@Component({
    moduleId:module.id,
    selector:"main-page",
    templateUrl:"main.page.html",
    styleUrls:["main.page.css"]
})

export class MainPage{
    title:string;
    constructor(private router:Router,private localeAuth:LocaleAuth){
    }
    goRegistration(){
        if(!this.localeAuth.checkAuth()) {
            this.router.navigate(['registration']);
        }
    }
    goLogin(){
        if(!this.localeAuth.checkAuth()) {
            this.router.navigate(['login']);
        }
    }
}