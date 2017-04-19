/**
 * Created by Влад on 02.04.2017.
 */
import {Component, OnInit} from "@angular/core";
import {SwapData, RouteTo, PersonalUser} from "../services/communicate/swap.data";
import {CurLang} from "../Entities/CurLang";
import {LocaleAuth} from "../services/locale.auth";
import {User} from "../Entities/User";
import {Router} from "@angular/router";
@Component({
    moduleId:module.id,
    selector:"personal",
    templateUrl:"personal.area.html",
    styleUrls:["personal.area.css"]
})

export class PersonalArea{
    loc:any;
    newPoster:boolean=this.swapData.personalAreaServ.getNewPoster();
    user:User;

    sessionUser:User;
    constructor(private swapData:SwapData, private localeAuth:LocaleAuth,private router:Router){
        this.loc = CurLang.locale;
        this.user=this.localeAuth.getUser();
        if(this.user.role=="ROLE_ADMIN"){
            this.sessionUser=PersonalUser.user;
            if(this.sessionUser.role=="ROLE_ADMIN"){
                this.router.navigate(['administration']);
            }
        }
        RouteTo.rout = 'personal';
    }

    addPoster(){
        this.swapData.personalAreaServ.setNewPoster(true);
        this.newPoster=true;
    }
    closeNewAdd(){
        this.swapData.personalAreaServ.setNewPoster(false);
        this.newPoster=false;
    }


}