import {Component} from "@angular/core";
import {SwapData, RouteTo, PersonalUser} from "../../services/communicate/swap.data";
import {FormBuilder,FormGroup,Validators} from "@angular/forms";
import {CurLang} from "../../Entities/CurLang";
import {User} from "../../Entities/User";
import {PostsService} from "../../services/posts.service";
@Component({
    moduleId:module.id,
    selector:"office",
    templateUrl:"office.component.html",
    styleUrls:["office.component.css"]
})

export class OfficeComponent{
    complexForm:FormGroup;
    loc:any;
    valid:boolean=true;
    success:boolean=false;
    constructor(private swapData:SwapData,fb:FormBuilder, private postsService:PostsService){
        RouteTo.rout='personal/profile';
        this.loc=CurLang.locale;
        var NAME_REGEXP = '[A-Za-zА-Яа-я]+';
        var EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.complexForm = fb.group({
            'name' : [null,Validators.compose([Validators.required, Validators.pattern(NAME_REGEXP)])],
            'pass' : [null, Validators.compose([ Validators.minLength(4), Validators.maxLength(20)])],
            'email' : [null, Validators.compose([Validators.minLength(5), Validators.pattern(EMAIL_REGEXP),Validators.maxLength(30)])]
        });
        this.fillFields()
    }
    fillFields(){
        this.postsService.sendPost(PersonalUser.user.id,"findUserByID").subscribe(answer=>{
            (document.getElementsByTagName("input")[0] as HTMLInputElement).value=answer.name;
            (document.getElementsByTagName("input")[1] as HTMLInputElement).value=answer.login;
            (document.getElementsByTagName("input")[2] as HTMLInputElement).value=answer.pass;
            (document.getElementsByTagName("input")[3] as HTMLInputElement).value=answer.email;
        });
    }


    submitForm(form:any){
        var user:User=PersonalUser.user;
        user.email=(document.getElementsByTagName("input")[3] as HTMLInputElement).value;
        user.name=(document.getElementsByTagName("input")[0] as HTMLInputElement).value;
        user.pass=(document.getElementsByTagName("input")[2] as HTMLInputElement).value;
        console.log(user);
        this.postsService.sendPost(user,'updateUser').subscribe(answer=>{
            if(answer==0){
                this.valid=false;
            }
            else{
                this.success=true;
                (document.getElementsByTagName("input")[0] as HTMLInputElement).value=user.name;
                (document.getElementsByTagName("input")[2] as HTMLInputElement).value=user.pass;
                (document.getElementsByTagName("input")[3] as HTMLInputElement).value=user.email;
                PersonalUser.user=user;
                for(var i=0;i<4;i++){
                    (document.getElementsByTagName("input")[0] as HTMLInputElement).disabled=true;
                }
         }
        });
    }

    edit(i:number){
        (document.getElementsByTagName("input")[i] as HTMLInputElement).disabled=false;
        (document.getElementsByTagName("input")[i] as HTMLInputElement).value="";
        (document.getElementsByTagName("input")[i] as HTMLInputElement).focus();
    }

    blur(i:number){
        if((document.getElementsByTagName("input")[i] as HTMLInputElement).value==""){
            if(i==0){
                (document.getElementsByTagName("input")[i] as HTMLInputElement).value=PersonalUser.user.name;
            }
            else if(i==2){
                (document.getElementsByTagName("input")[i] as HTMLInputElement).value=PersonalUser.user.pass;
            }
            else
            {
                (document.getElementsByTagName("input")[i] as HTMLInputElement).value=PersonalUser.user.email;
            }
        }
    }
}