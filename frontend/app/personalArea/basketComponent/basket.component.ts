/**
 * Created by Влад on 02.04.2017.
 */
import {Component} from "@angular/core";
import {SwapData} from "../../services/communicate/swap.data";
@Component({
    moduleId:module.id,
    selector:"basket",
    templateUrl:"basket.component.html",
    styleUrls:["basket.component.css"]
})

export class BasketComponent{
    constructor(private swapData:SwapData){
        swapData.personalAreaServ.setCurrentPage(3);
    }
}