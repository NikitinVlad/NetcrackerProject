import {Component} from "@angular/core";
import {CurrPoster} from "../dto/CurrPoster";
import {PostsService} from "../services/posts.service";
import {PagerService} from "../services/pager.service";
import {DomSanitizer} from "@angular/platform-browser";
import {CurLang} from "../Entities/CurLang";
import {SwapData, RouteTo} from "../services/communicate/swap.data";
import {Router} from "@angular/router";
import {LocaleAuth} from "../services/locale.auth";
import {Mark} from "../Entities/Mark";
import {City} from "../Entities/City";


@Component({
    moduleId:module.id,
    selector:"catalog-component",
    templateUrl:"catalog.component.html",
    styleUrls:["catalog.component.css","radio.style.css"]
})

export class CatalogComponent{
    marks:Mark[];
    cities:City[];

    currency:string="USD";

    curPage:number;
    loc: any;


    private sizeItems: number;
    private currentItems: any[];
    options: number[] = [];

    currentSelection: number;

    pager: any = {};


    pagedItems: CurrPoster[];
    pagedItemsBasket:any[]=[];
    constructor(private auth:LocaleAuth,private postsService: PostsService, private pagerService: PagerService,private sanitizer: DomSanitizer,private swapData:SwapData, private  router:Router){
        RouteTo.rout='catalog';
        this.loc=CurLang.locale;
        this.currentSelection=this.swapData.personalAreaServ.getOptionCatalogSelected();
        this.postsService.getData('getAllPostersSize').subscribe(answer=> {
            this.sizeItems = answer;
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
        this.fillParametrs()
    }

    fillParametrs(){

    }

    setPage(page: number) {
        this.curPage=page;
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pager = this.pagerService.getPager(this.sizeItems, page, this.currentSelection);
        this.currentItems = [this.pager.startIndex + 1, this.pager.endIndex + 1, 'date'];
        this.postsService.sendPost(this.currentItems, 'getRangeAllPosters').subscribe(answer=> {
            this.pagedItems = answer;
            for(var i=0;i<this.pagedItems.length;i++){
                var mas=[this.pagedItems[i].id,false];
                this.pagedItemsBasket.push(mas);
            }
        });
    }

    setOption(sel: string) {
        var num = +sel;
        this.swapData.personalAreaServ.setOptionCatalogSelected(num);
        this.router.navigate(["help"]);
    }
    getTransmission(tr: string): string {
        if (tr == "FRONT") {
            return "привод:передний, ";
        }
        else if (tr == "REAR") {
            return "привод:задний, ";
        }
        else if (tr == "FULL") {
            return "привод:полный, ";
        }
        else return "";
    }

    getFuel(fl: string): string {
        if (fl == "PETROL") {
            return "бензин, ";
        }
        else if (fl == "DIESEL") {
            return "дизель, ";
        }
        else if (fl == "HYBRID") {
            return "гибрид, ";
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

    putToBasket(idPoster:number){
        var inBasket=false;
        for(var i=0;i<this.pagedItemsBasket.length;i++){
            if(idPoster==this.pagedItemsBasket[i][0]){
                if(this.pagedItemsBasket[i][1]==true){
                    inBasket=true;
                }
                else {
                    this.pagedItemsBasket[i][1] = true;
                }
            }
        }
        if(!inBasket){
            console.log("Добавляем в корзину");
        }
    }


    getBasketImg(idPoster:number):string{
        for(var i=0;i<this.pagedItemsBasket.length;i++){
            if(idPoster==this.pagedItemsBasket[i][0]){
                if(this.pagedItemsBasket[i][1]==false){
                return '../../images/to-basket.png';
                }
                else {
                    return '../../images/in-basket.png'
                }
            }
        }
    }

    getBasketTitle(idPoster:number):string{
        for(var i=0;i<this.pagedItemsBasket.length;i++){
            if(idPoster==this.pagedItemsBasket[i][0]){
                if(this.pagedItemsBasket[i][1]==false){
                    return 'Добавить в корзину';
                }
                else {
                    return 'У вас в корзине';
                }
            }
        }
    }

    getAuthID() :number{
        var user=this.auth.getUser();

        var id;
        if(user==null || user.role=="ROLE_ADMIN"){
            id=0;
        }
        else{
            id=user.id;
        }
        return id;
    }

    changeCurrency(flag:boolean):any{
        if(this.currency=='USD'){
            if(flag==true)
            this.currency='BLR';
            return 'BLR';
        }
        else {
            if(flag==true)
            this.currency='USD';
            return 'USD';
        }
    }


}