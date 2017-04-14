/**
 * Created by Влад on 14.03.2017.
 */
import {Component} from '@angular/core';
import {PostsService} from "../services/posts.service";
import {Router} from "@angular/router";
import {ToasterContainerComponent, ToasterService, Toast,ToasterConfig} from 'angular2-toaster';
import { FormGroup, FormBuilder ,Validators} from '@angular/forms';
import {User} from "../Entities/User";
import {RouteTo} from "../services/communicate/swap.data";
import {CurLang} from "../Entities/CurLang";



@Component({
    moduleId:module.id,
    selector:"registration",
    templateUrl:"registration.component.html",
    styleUrls:["registration.component.css"],
})
export class RegistrationComponent{
    loc:any;
    id:number;
    isAdmin:boolean;
    complexForm:FormGroup;
    toasterconfig : ToasterConfig;
    toast : Toast;
    constructor(private postsService:PostsService, private router:Router,private toasterService:ToasterService,fb:FormBuilder){
        this.loc=CurLang.locale;
        RouteTo.rout='registration';
        var EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.complexForm = fb.group({
            'name' : [null, Validators.required],
            'login': [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(15)])],
            'pass' : [null, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(20)])],
            'email' : [null, Validators.compose([Validators.required,Validators.minLength(5), Validators.pattern(EMAIL_REGEXP),Validators.maxLength(30)])]
        });
        this.isAdmin=false;
        this.id=1;
        this.toasterconfig = new ToasterConfig({positionClass: 'center'});
        this.toast={
            type: 'warning',
            title: 'Title text',
            body: 'Body text',
            timeout: 2000,
            showCloseButton: true
        };
    }
    submitForm(form:any){
        var user:User=new User(form.name,form.login,form.pass,form.email);
        console.log(user);
        this.postsService.sendPost(user,'createUser').subscribe(answer=>{
            console.log(answer);
            if(answer>=1){
                this.showToast('success',''+this.loc.mes_cong,''+this.loc.mes_cong_body);
                this.router.navigate(["main"]);
            }
            else {
                this.showToast('error',this.loc.err_reg,this.loc.err_reg_body+' '+user.login+' '+this.loc.err_reg_body2);
            }
        });
    }

    showToast(type:string,title:string,body:string){
        console.log('there');
        this.toast.type=type;
        this.toast.title=title;
        this.toast.body=body;
        this.toasterService.pop(this.toast);
    }

}