/**
 * Created by Влад on 02.04.2017.
 */
import {Component} from "@angular/core";
import {PagerService} from "../../services/pager.service";
import * as _ from 'underscore';
import {PostsService} from "../../services/posts.service";
import {Router} from "@angular/router";
import {routes} from "../../app.routes";
import {SwapData} from "../../services/communicate/swap.data";
import {CurLang} from "../../Entities/CurLang";

@Component({
    moduleId:module.id,
    selector:"posters",
    templateUrl:"poster.component.html",
    styleUrls:["poster.component.css"]
})

export class PosterComponent{
    loc:any;


    private sizeItems:number;
    private currentItems:any[];
    options:number[]=[];

    currentSelection:number;

    pager: any = {};


    pagedItems: any[];

    constructor(private postsService:PostsService, private pagerService: PagerService,private router:Router,private swapData:SwapData) {
        this.loc=CurLang.locale;
        swapData.personalAreaServ.setCurrentPage(2);
        console.log("constructor");
        this.currentSelection=this.swapData.personalAreaServ.getOptionSelected();
        this.postsService.getData('getCitiesSize').subscribe(answer=>{
            this.sizeItems=answer;
            if(this.sizeItems>20){
                for(var i=0;i<20;i++){
                    this.options.push(i+1);
                }
            }
            else {
                for(var i=0;i<this.sizeItems;i++){
                    this.options.push(i+1);
                }
            }
            this.setPage(1);
        });
    }
    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pager = this.pagerService.getPager(this.sizeItems, page,this.currentSelection);
        this.currentItems=[this.pager.startIndex+1,this.pager.endIndex+1,'name'];
        this.postsService.sendPost(this.currentItems,'getRangeCities').subscribe(answer=>{
            this.pagedItems=answer;
        });
    }
    setOption(sel:string){
        var num=+sel;
        this.swapData.personalAreaServ.setOptionSelected(num);
        this.router.navigate(["help"]);
    }
}