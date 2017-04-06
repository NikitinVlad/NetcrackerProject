import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {LocaleAuth} from "../services/locale.auth";
import {CurLang} from "../Entities/CurLang";
import {RouteTo} from "../services/communicate/swap.data";


@Component({
    moduleId:module.id,
    selector:"main-page",
    templateUrl:"main.page.html",
    styleUrls:["main.page.css"]
})

export class MainPage{
    loc:any;

    constructor(private router:Router,private localeAuth:LocaleAuth){
        console.log('main');
        console.log(CurLang.locale);
        this.loc=CurLang.locale;
        RouteTo.rout='main';
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