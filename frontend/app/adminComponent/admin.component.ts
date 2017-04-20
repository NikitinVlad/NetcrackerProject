/**
 * Created by Влад on 19.04.2017.
 */
import {Component} from "@angular/core";
import {CurLang} from "../Entities/CurLang";
import {RouteTo} from "../services/communicate/swap.data";
@Component({
    moduleId:module.id,
    selector:"admin-component",
    templateUrl:"admin.component.html",
    styleUrls:["admin.component.css"]
})
export class AdminComponent{
    loc:any;
    constructor(){
        this.loc=CurLang.locale;
        RouteTo.rout='administration';
    }
}