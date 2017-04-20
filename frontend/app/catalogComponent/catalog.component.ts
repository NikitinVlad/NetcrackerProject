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
import {User} from "../Entities/User";


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
    f:boolean=false;
    s:boolean=false;
    t:boolean=false;

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
        var filter:FilterPosters=new FilterPosters();
        filter.orderField="date";
        filter.typeOrder="DESC";
        this.postsService.sendPost(filter,'getFilterPostersSize').subscribe(answer=> {
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
        var mark=(document.getElementsByTagName("select")[2] as HTMLSelectElement);
        if(mark.selectedIndex==0){
            filter.mark="";
        }
        else{
            filter.mark=mark.value;
        }
        var model=(document.getElementsByTagName("select")[3] as HTMLSelectElement);
        if(model.selectedIndex==0){
            filter.model="";
        }
        else {
            filter.model=model.value;
        }
        var yearFrom=(document.getElementsByTagName("select")[4] as HTMLSelectElement);
        if(yearFrom.selectedIndex==0){
            filter.yearFrom=0;
        }
        else {
            filter.yearFrom=+yearFrom.value-1;
        }
        var yearTo=(document.getElementsByTagName("select")[5] as HTMLSelectElement);
        if(yearTo.selectedIndex==0){
            filter.yearTo=0;
        }
        else {
            filter.yearTo=+yearTo.value+1;
        }
        filter.currency=this.currency;
        var priceFrom=(document.getElementsByTagName("select")[6] as HTMLSelectElement);
        if(priceFrom.selectedIndex==0){
            filter.priceFrom=0;
        }
        else {
            filter.priceFrom=+priceFrom.value;
        }
        var priceTo=(document.getElementsByTagName("select")[7] as HTMLSelectElement);
        if(priceTo.selectedIndex==0){
            filter.priceTo=0;
        }
        else {
            filter.priceTo=+priceTo.value;
        }
        var dimensionFrom=(document.getElementsByTagName("input")[3] as HTMLInputElement);

        if(dimensionFrom.value=="" && +dimensionFrom.value<=0){
            filter.dimensionFrom="";
        }
        else {
            filter.dimensionFrom = dimensionFrom.value;
        }
        var dimensionTo=(document.getElementsByTagName("input")[4] as HTMLInputElement);
        if(dimensionTo.value=="" && +dimensionTo.value<=0){
            filter.dimensionTo="";
        }
        else {
            filter.dimensionTo=dimensionTo.value;
        }
        if(filter.dimensionFrom!="" && filter.dimensionTo!="" && +filter.dimensionFrom>+filter.dimensionTo){
            filter.dimensionFrom="";
            filter.dimensionTo="";
        }
        filter.fuel="";
        for(var i=0;i<3;i++) {
            var fuel = (document.getElementsByTagName("input")[i] as HTMLInputElement);
            if(fuel.checked) {
                filter.fuel = fuel.value;
                break;
            }
        }
        var trans=(document.getElementsByTagName("select")[8] as HTMLSelectElement);
        if(trans.selectedIndex==0){
            filter.transmission="";
        }
        else {
            if(trans.selectedIndex==1){
                filter.transmission="FRONT";
            }
            if(trans.selectedIndex==2){
                filter.transmission="REAR";
            }
            if(trans.selectedIndex==3){
                filter.transmission="FULL";
            }
        }
        var city=(document.getElementsByTagName("select")[9] as HTMLSelectElement);
        if(city.selectedIndex==0){
            filter.city="";
        }
        else{
            filter.city=city.value;
        }
        var sort=(document.getElementsByTagName("select")[1] as HTMLSelectElement);
        if(sort.selectedIndex==0){
            filter.orderField="date";
            filter.typeOrder="DESC";
        }
        if(sort.selectedIndex==1){
            filter.orderField="date";
            filter.typeOrder="ASC";
        }
        if(sort.selectedIndex==2){
            filter.orderField="price";
            filter.typeOrder="DESC";
        }
        if(sort.selectedIndex==3){
            filter.orderField="price";
            filter.typeOrder="ASC";
        }
        if(sort.selectedIndex==4){
            filter.orderField="year";
            filter.typeOrder="ASC";
        }
        if(sort.selectedIndex==5){
            filter.orderField="year";
            filter.typeOrder="DESC";
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
        this.filterPosters(true);
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
        this.filterPosters(true);
    }
    changeMark(){
        var mark=(document.getElementsByTagName("select")[2] as HTMLSelectElement);
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
        this.filterPosters(true);
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
            if(this.pagedItems.length==0 && page!=1){
                this.setPage(page-1);
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

    putToBasket(curPoster:CurrPoster){
        var idPoster=curPoster.id;
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
            var poster:CurrPoster=new CurrPoster();
            poster.id=curPoster.id;
            poster.user.id=this.auth.getUser().id;

            this.postsService.sendPost(poster,'addToBasket').subscribe(ans=>{
                this.postsService.sendPost(this.filterPosters(false), 'getFilterPostersSize').subscribe(answer=> {
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
                        if (this.sizeItems < this.currentSelection)
                            this.currentSelection = this.sizeItems;
                    }
                });
            });
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
                    return this.loc.cat_tobasket;
                }
                else {
                    return this.loc.cat_inbasket;
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
                    (document.getElementsByTagName("select")[6] as HTMLSelectElement).selectedIndex=0;
                    (document.getElementsByTagName("select")[7] as HTMLSelectElement).selectedIndex=0;
                this.filterPosters(true);
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
                (document.getElementsByTagName("select")[6] as HTMLSelectElement).selectedIndex=0;
                (document.getElementsByTagName("select")[7] as HTMLSelectElement).selectedIndex=0;
                this.filterPosters(true);
            }

            return 'USD';
        }

    }
    radioClick(num:number){
        if(num==0 && this.f==false){
            this.f=true;
            this.t=false;
            this.s=false;
        }
        else if(num==0 && this.f==true){
            this.f=false;
            (document.getElementsByTagName("input")[num] as HTMLInputElement).checked=false;
        }
        else if(num==1 && this.s==false){
            this.s=true;
            this.f=false;
            this.t=false;
        }
        else if(num==1 && this.s==true){
            this.s=false;
            (document.getElementsByTagName("input")[num] as HTMLInputElement).checked=false;
        }
        else if(num==2 && this.t==false){
            this.t=true;
            this.f=false;
            this.s=false;
        }
        else if(num==2 && this.t==true){
            this.t=false;
            (document.getElementsByTagName("input")[num] as HTMLInputElement).checked=false;
        }
        this.filterPosters(true);
    }

    goPoster(id:number){
        this.swapData.personalAreaServ.setCurrentPosterID(id);
        RouteTo.routBeforeCurPoster="catalog";
        this.router.navigate(["poster"]);
    }
}