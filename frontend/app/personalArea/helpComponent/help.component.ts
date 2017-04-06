/**
 * Created by Влад on 02.04.2017.
 */
import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {RouteTo} from "../../services/communicate/swap.data";
@Component({
    moduleId:module.id,
    selector:"help",
    template:"<h1>Хвыа</h1>"
})

export class HelpComponent{
    constructor(private router:Router){
        this.router.navigate([RouteTo.rout]);
    }
}