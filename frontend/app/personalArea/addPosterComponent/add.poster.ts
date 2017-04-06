/**
 * Created by Влад on 06.04.2017.
 */
import {Component} from "@angular/core";
import {SwapData} from "../../services/communicate/swap.data";
import {CurLang} from "../../Entities/CurLang";
@Component({
    moduleId:module.id,
    selector:"add-poster",
    templateUrl:"add.poster.html",
    styleUrls:["add.poster.css"]
})

export class AddPoster{
    years:number[]=[];
    loc:any=CurLang.locale;
    constructor(private swapData:SwapData){
        for(var i=2017;i>=1990;i--){
            this.years.push(i);
        }
        this.swapData.personalAreaServ.setCurrentPage(4);
    }
}