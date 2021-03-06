/**
 * Created by Влад on 01.04.2017.
 */
import {Component} from "@angular/core";
import { FormGroup, FormBuilder ,Validators} from '@angular/forms';
import {PostsService} from "../services/posts.service";
import {User} from "../Entities/User";
import {LocaleAuth} from "../services/locale.auth";
import {Router} from "@angular/router";
import {UserLogin} from "../dto/UserLogin";
import {RouteTo, PersonalUser} from "../services/communicate/swap.data";
import {CurLang} from "../Entities/CurLang";
@Component({
    moduleId:module.id,
    selector:"logIn",
    templateUrl:"login.component.html",
    styleUrls:["login.component.css"]
})
export class LoginComponent{
    loc:any;
    complexForm:FormGroup;
    myerror:boolean=false;
    constructor(private postsService:PostsService,fb:FormBuilder,private localeAuth:LocaleAuth,private router:Router){
        this.loc=CurLang.locale;
        RouteTo.rout='login';

        var LOGIN_REGEXP='[A-Za-z0-9_-]+';
        this.complexForm = fb.group({
            'login': [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(15),Validators.pattern(LOGIN_REGEXP)])],
            'pass' : [null, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(20)])]
        });
    }
    submitForm(form:any){
        var user:UserLogin=new UserLogin(form.login,form.pass);
        this.postsService.sendPost(user,'checkUser').subscribe(answer=>{
            if(answer.id!="") {
                this.myerror=false;
                var user: User = answer;
                this.localeAuth.logIn(user);
                PersonalUser.user=user;

                this.router.navigate(["main"]);
            }
            else {
                this.myerror=true;
            }
        });
    }
}