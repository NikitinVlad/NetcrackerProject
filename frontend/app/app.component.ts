import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {Role} from "./Entities/Role";
import {ToasterContainerComponent, ToasterService, Toast,ToasterConfig} from 'angular2-toaster';
import {LocaleAuth} from "./services/locale.auth";
import {SwapData} from "./services/communicate/swap.data";

@Component({
    moduleId:module.id,
    selector:"my-app",
    templateUrl:"app.component.html",
    styleUrls:["app.component.css"]
})
export class AppComponent{
    // auth:LocaleAuth;
    toasterconfig : ToasterConfig;
    toast : Toast;
    constructor(private router:Router,private toasterService:ToasterService,private localeAuth:LocaleAuth,private swapData:SwapData){
        // this.auth=new LocaleAuth();
        this.toasterconfig = new ToasterConfig({positionClass: 'center',limit:1});
        this.toast={
            type: 'warning',
            title: 'Title text',
            body: 'Body text',
            timeout: 2000,
            showCloseButton: true
        };
    }
    goMainPage(){
        this.router.navigate(["main"]);
    }
    goRegistration(){
        this.toasterService.pop("warning","Добро пожаловать","Зарегистрируйтесь и вы войдете в систему :)")
        this.router.navigate(["registration"]);
    }
    goLogin(){
        this.router.navigate(["login"]);
    }
    goPersonalArea(page:number){
        this.swapData.personalAreaServ.setCurrentPage(page);
        this.router.navigate(["help"]);
    }
    exit():void{
        this.localeAuth.logOut();
        this.goMainPage();
    }
}