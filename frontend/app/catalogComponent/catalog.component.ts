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
import {AddInfo} from "../dto/AddInfo";
import {Model} from "../Entities/Model";
import {FilterPosters} from "../dto/FilterPosters";


@Component({
    moduleId:module.id,
    selector:"catalog-component",
    templateUrl:"catalog.component.html",
    styleUrls:["catalog.component.css","radio.style.css"]
})

export class CatalogComponent{
    addInfo:AddInfo=new AddInfo();
    priceFrom:number[]=[];
    priceTo:number[]=[];
    yearFrom:number[]=[];
    yearTo:number[]=[];
    models:Model[];

    currency:string="USD";

    curPage:number;
    loc: any;


    private sizeItems: number;
    options: number[] = [];

    currentSelection: number=4;

    pager: any = {};


    pagedItems: CurrPoster[];
    pagedItemsBasket:any[]=[];
    constructor(private auth:LocaleAuth,private postsService: PostsService, private pagerService: PagerService,private sanitizer: DomSanitizer,private swapData:SwapData, private  router:Router){
        RouteTo.rout='catalog';
        this.loc=CurLang.locale;
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

    filterPosters(flag:boolean):FilterPosters{
        var filter:FilterPosters=new FilterPosters();
        // var mark=(document.getElementsByTagName("select")[1] as HTMLSelectElement);
        // if(mark.selectedIndex==0){
        //     filter.mark="";
        // }
        // else{
        //     filter.mark=mark.value;
        // }
        filter.orderField='date';
        var city=(document.getElementsByTagName("select")[8] as HTMLSelectElement);
        if(city.selectedIndex==0){
            filter.city="";
        }
        else{
            filter.city=city.value;
        }
        if(flag==true) {
            this.postsService.sendPost(filter, 'getFilterPostersSize').subscribe(answer=> {
                this.sizeItems = answer;
                this.options = [];
                this.currentSelection=4;
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
                this.setPage(1);
            });
        }
        return filter;
    }
    fillParametrs(){
        this.postsService.getData('getAddInfo').subscribe(ans=>{
            this.addInfo=ans;
        });
        for(var i=500;i<=60000;) {
            this.priceFrom.push(i);
            this.priceTo.push(i);
            i=i+500;
        }
        for(var i=1990;i<=2017;i++){
            this.yearFrom.push(i);
            this.yearTo.push(i);
        }
    }
    changeYearFrom(val:string){
        var value=+val;
        this.yearTo=[];
        for(var i=1990;i<=2017;i++){
            this.yearTo.push(i);
        }
        if(value>=1990){
            this.yearTo=[];
            for(var i=value;i<=2017;i++){
                this.yearTo.push(i);
            }
        }
    }

    changePriceFrom(val:string){
        if(this.currency=='USD') {
            this.priceTo=[];
            for (var i = 500; i <= 60000;) {
                this.priceTo.push(i);
                i = i + 500;
            }
            var value = +val;
            if (value >= 500) {
                this.priceTo = [];
                for (var i = value; i <= 60000;) {
                    this.priceTo.push(i);
                    i = i + 500;
                }
            }
        }
        else{
            this.priceTo=[];
            for (var i = 2000; i <= 200000;) {
                this.priceTo.push(i);
                i = i + 2000;
            }
            var value = +val;
            if (value >= 2000) {
                this.priceTo = [];
                for (var i = value; i <= 200000;) {
                    this.priceTo.push(i);
                    i = i + 2000;
                }
            }
        }
    }
    changeMark(){
        var mark=(document.getElementsByTagName("select")[1] as HTMLSelectElement);
        if(mark.selectedIndex==0){
            this.models=[];
        }
        else {
            for(var i=0;i<this.addInfo.marks.length;i++){
                if(mark.value==this.addInfo.marks[i].name){
                    this.postsService.sendPost(this.addInfo.marks[i].id, 'getModels').subscribe(data=> {
                        this.models = data;
                    });
                }
            }
        }
    }

    setPage(page: number) {
        this.curPage=page;
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }



        this.pager = this.pagerService.getPager(this.sizeItems, page, this.currentSelection);

        var filter=this.filterPosters(false);
        filter.from=this.pager.startIndex + 1;
        filter.to=this.pager.endIndex+1;
        this.postsService.sendPost(filter, 'rangeFilterPosters').subscribe(answer=> {
            this.pagedItems = answer;
            for(var i=0;i<this.pagedItems.length;i++){
                var mas=[this.pagedItems[i].id,false];
                this.pagedItemsBasket.push(mas);
            }
        });
    }

    setOption(sel: string) {
        var num = +sel;
        this.currentSelection=num;
        this.setPage(1);
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
            if(flag==true) {
                this.priceTo=[];
                this.priceFrom=[];
                this.currency = 'BLR';
                for(var i=2000;i<=200000;) {
                    this.priceFrom.push(i);
                    this.priceTo.push(i);
                    i=i+2000;
                }
            }
            return 'BLR';
        }
        else {
            if(flag==true) {
                this.priceTo=[];
                this.priceFrom=[];
                this.currency = 'USD';
                for(var i=500;i<=60000;) {
                    this.priceFrom.push(i);
                    this.priceTo.push(i);
                    i=i+500;
                }
            }
            return 'USD';
        }

    }
}