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
    current:number;
    constructor(private swapData:SwapData){
        this.loc=CurLang.locale;
        RouteTo.rout='personal';
        this.current=swapData.personalAreaServ.getCurrentPage();
    }
    changeCur(cur:number){
        this.current=cur;
    }

}