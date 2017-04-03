/**
 * Created by Влад on 02.04.2017.
 */
import {Component, OnInit} from "@angular/core";
import {SwapData} from "../services/communicate/swap.data";
@Component({
    moduleId:module.id,
    selector:"personal",
    templateUrl:"personal.area.html",
    styleUrls:["personal.area.css"]
})

export class PersonalArea{

    current:number;
    constructor(private swapData:SwapData){
        this.current=swapData.personalAreaServ.getCurrentPage();
    }
    changeCur(cur:number){
        this.current=cur;
    }

}