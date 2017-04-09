import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {ToasterService, Toast,ToasterConfig} from 'angular2-toaster';
import {LocaleAuth} from "./services/locale.auth";
import {SwapData, RouteTo} from "./services/communicate/swap.data";
import {CurLang} from "./Entities/CurLang";
import {PostsService} from "./services/posts.service";
import {Lang} from "./dto/Lang";



@Component({
    moduleId:module.id,
    selector:"my-app",
    templateUrl:"app.component.html",
    styleUrls:["app.component.css"]
})
export class AppComponent{
    active:string='ru';
    loc:any;
    toasterconfig : ToasterConfig;
    toast : Toast;
    constructor(private postsService:PostsService,private router:Router,private toasterService:ToasterService,private localeAuth:LocaleAuth,private swapData:SwapData){
        this.loc=CurLang.locale;
        this.toasterconfig = new ToasterConfig({positionClass: 'center',limit:1});
        this.toast={
            type: 'warning',
            title: 'Title text',
            body: 'Body text',
            timeout: 2000,
            showCloseButton: true
        };
    }
    test():Promise<any>{
        return this.postsService.sendPost(new Lang(CurLang.lang).lang,"messageBundle").toPromise()
            .then((data: any) => {
            CurLang.locale=data;
                this.loc=CurLang.locale;
            })
            .catch((err: any) => Promise.resolve());
    }

    changeLang(lang:string){
        this.active=lang;
        CurLang.lang=lang;
        this.test().then(answ=>{
            this.router.navigate(['help']);
        });
    }
    goMainPage(){
        this.router.navigate(["main"]);
    }
    goRegistration(){
        this.toasterService.pop("warning",this.loc.mes_welcome,this.loc.mes_welcome_body)
        this.router.navigate(["registration"]);
    }
    goLogin(){
        this.router.navigate(["login"]);
    }
    goPersonalArea(page:string){
        RouteTo.rout='poster';
        this.router.navigate(["help"]);
    }
    exit():void{
        this.localeAuth.logOut();
        this.goMainPage();
    }
}