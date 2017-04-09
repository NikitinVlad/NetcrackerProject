/**
 * Created by Влад on 02.04.2017.
 */
import {Component} from "@angular/core";
import {SwapData, RouteTo} from "../../services/communicate/swap.data";
@Component({
    moduleId:module.id,
    selector:"office",
    templateUrl:"office.component.html",
    styleUrls:["office.component.css"]
})

export class OfficeComponent{
    constructor(private swapData:SwapData){
        RouteTo.rout='personal/profile';
    }
}