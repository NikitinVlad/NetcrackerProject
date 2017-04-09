/**
 * Created by Влад on 02.04.2017.
 */
import {Component, OnInit} from "@angular/core";
import {SwapData, RouteTo} from "../services/communicate/swap.data";
import {CurLang} from "../Entities/CurLang";
@Component({
    moduleId:module.id,
    selector:"personal",
    templateUrl:"personal.area.html",
    styleUrls:["personal.area.css"]
})

export class PersonalArea{
    loc:any;
    newPoster:boolean=this.swapData.personalAreaServ.getNewPoster();
    constructor(private swapData:SwapData){
        this.loc=CurLang.locale;
        RouteTo.rout='personal';
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