/**
 * Created by Влад on 02.04.2017.
 */
import {Component} from "@angular/core";
import {SwapData, RouteTo, PersonalUser} from "../../services/communicate/swap.data";
import {CurrPoster} from "../../dto/CurrPoster";
import {PostsService} from "../../services/posts.service";
import {PagerService} from "../../services/pager.service";
import {Router} from "@angular/router";
import {LocaleAuth} from "../../services/locale.auth";
import {DomSanitizer} from "@angular/platform-browser";
import {CurLang} from "../../Entities/CurLang";
import {BasketCount} from "../../dto/BasketCount";
@Component({
    moduleId:module.id,
    selector:"basket",
    templateUrl:"basket.component.html",
    styleUrls:["basket.component.css","modal.window.css"]
})

export class BasketComponent{
    curPage:number;
    loc: any;
    modal:boolean=false;

    priceInModal:number;


    private sizeItems: number;
    private currentItems: any[];
    options: number[] = [];

    currentSelection: number=4;

    pager: any = {};


    pagedItems: CurrPoster[];


    basketCount:BasketCount=new BasketCount();

    constructor(private postsService: PostsService, private pagerService: PagerService, private router: Router, private swapData: SwapData, private auth: LocaleAuth, private sanitizer: DomSanitizer) {
        RouteTo.rout = 'personal/basket';
        this.loc = CurLang.locale;
        this.postsService.sendPost(PersonalUser.user.id, 'getBasketSize').subscribe(answer=> {
            this.basketCount=answer;
            this.sizeItems = this.basketCount.size;
            if (this.sizeItems > 20) {
                for (var i = 0; i < 20; i++) {
                    this.options.push(i + 1);
                }
            }
            else {
                for (var i = 0; i < this.sizeItems; i++) {
                    this.options.push(i + 1);
                }
                if(this.sizeItems<this.currentSelection)
                    this.currentSelection=this.sizeItems;
            }
            this.setPage(1);
        });
    }

    setPage(page: number) {
        this.curPage=page;
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pager = this.pagerService.getPager(this.sizeItems, page, this.currentSelection);
        this.currentItems = [this.pager.startIndex + 1, this.pager.endIndex + 1, PersonalUser.user.id];
        this.postsService.sendPost(this.currentItems, 'getRangePostersBasket').subscribe(answer=> {
            this.pagedItems = answer;
        });
    }

    setOption(sel: string) {
        var num = +sel;
        this.currentSelection=num;
        this.setPage(1);
    }

    getTransmission(tr: string): string {
        if (tr == "FRONT") {
            return this.loc.pers_front+", ";
        }
        else if (tr == "REAR") {
            return this.loc.pers_back+", ";
        }
        else if (tr == "FULL") {
            return this.loc.pers_full+", ";
        }
        else return "";
    }

    getFuel(fl: string): string {
        if (fl == "PETROL") {
            return this.loc.pers_petrol+", ";
        }
        else if (fl == "DIESEL") {
            return this.loc.pers_diesel+", ";
        }
        else if (fl == "HYBRID") {
            return this.loc.pers_hybrid+", ";
        }
        else return "";
    }

    getImg(bytes: number[]) {
        var imgPath = "../../../images/noimage.png";

        if(bytes!=null){
            imgPath = 'data:image/jpg;base64,'+bytes;
        }
        return this.sanitizer.bypassSecurityTrustUrl(imgPath);
    }

    goPoster(id:number){
        this.swapData.personalAreaServ.setCurrentPosterID(id);
        RouteTo.routBeforeCurPoster="personal/basket";
        this.router.navigate(["poster"]);
    }

    deletePoster(item:CurrPoster){
        var index = this.pagedItems.indexOf(item, 0);
        if (index > -1) {
            this.pagedItems.splice(index, 1);
        }
        this.postsService.sendPost(item.id,'deleteFromBasket').subscribe(ans=>{
            this.postsService.sendPost(PersonalUser.user.id, 'getBasketSize').subscribe(answer=> {
                this.basketCount=answer;
                this.options=[];
                this.sizeItems = this.basketCount.size;
                if (this.sizeItems > 20) {
                    for (var i = 0; i < 20; i++) {
                        this.options.push(i + 1);
                    }
                }
                else {
                    for (var i = 0; i < this.sizeItems; i++) {
                        this.options.push(i + 1);
                    }
                    if (this.sizeItems < this.currentSelection)
                        this.currentSelection = this.sizeItems;
                }
                this.setPage(this.curPage);
            });
        });
    }
    closeModal(){
        this.modal=false;
    }
    buyAll(){

        this.postsService.sendPost(this.auth.getUser().id,'buyCars').subscribe(answer=>{
            if(answer==this.auth.getUser().id){
                this.modal=true;
                this.priceInModal=this.basketCount.priceUsd;
                this.postsService.sendPost(this.auth.getUser().id, 'getBasketSize').subscribe(answer=> {
                    this.basketCount=answer;
                    this.options=[];
                    this.sizeItems = this.basketCount.size;
                    if (this.sizeItems > 20) {
                        for (var i = 0; i < 20; i++) {
                            this.options.push(i + 1);
                        }
                    }
                    else {
                        for (var i = 0; i < this.sizeItems; i++) {
                            this.options.push(i + 1);
                        }
                        if (this.sizeItems < this.currentSelection)
                            this.currentSelection = this.sizeItems;
                    }
                    this.setPage(this.curPage);
                });
            }
        });
    }
}