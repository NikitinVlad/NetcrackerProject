/**
 * Created by Влад on 08.04.2017.
 */
import {Component, Sanitizer, SecurityContext} from "@angular/core";
import {RouteTo, SwapData} from "../services/communicate/swap.data";
import {PostsService} from "../services/posts.service";
import {Router} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {Bytes} from "../dto/Bytes";
import {CurrPoster} from "../dto/CurrPoster";
import {CurLang} from "../Entities/CurLang";


@Component({
    moduleId:module.id,
    selector:"current-poster",
    templateUrl:"current.poster.html",
    styleUrls:["current.poster.css"]
})

export class CurrentPoster{
    loc:any;
    newImage:boolean=false;
    imgPath:any='../../images/noimage.png';
    fileData:FormData;
    poster:CurrPoster=new CurrPoster();
    constructor(private swapData:SwapData,private postsService:PostsService,private router:Router,private sanitizer:DomSanitizer){
        this.loc=CurLang.locale;
        RouteTo.rout='poster';
        this.postsService.sendPost(swapData.personalAreaServ.getCurrentPosterID(),'getCurrentPoster').subscribe(answer=>{
            this.poster=answer;
           this.updatePoster();
        });
    }
    updatePoster(){

        if(this.poster.currency=='USD') {
            (document.getElementsByClassName('cur')[0] as HTMLSelectElement).selectedIndex=0;
            (document.getElementsByClassName("cur-input")[0] as HTMLInputElement).value = '' + this.poster.priceUsd;
        }
        else {
            (document.getElementsByClassName('cur')[0] as HTMLSelectElement).selectedIndex=1;
            (document.getElementsByClassName("cur-input")[0] as HTMLInputElement).value = '' + this.poster.priceBlr;
        }

        if(this.poster.transmission=="FRONT"){
            (document.getElementsByClassName('transmission')[0] as HTMLSelectElement).selectedIndex=0;
        }
        else if(this.poster.transmission=="REAR"){
            (document.getElementsByClassName('transmission')[0] as HTMLSelectElement).selectedIndex=1;
        }
        else {
            (document.getElementsByClassName('transmission')[0] as HTMLSelectElement).selectedIndex=2;
        }


        if(this.poster.fuel=="PETROL"){
            (document.getElementsByClassName('fuel')[0] as HTMLSelectElement).selectedIndex=0;
        }
        else if(this.poster.fuel=="DIESEL"){
            (document.getElementsByClassName('fuel')[0] as HTMLSelectElement).selectedIndex=1;
        }
        else {
            (document.getElementsByClassName('fuel')[0] as HTMLSelectElement).selectedIndex=2;
        }

        (document.getElementsByClassName('dimension')[0] as HTMLInputElement).value=this.poster.dimension;

        if(this.poster.file!=null) {
            this.imgPath = 'data:image/jpg;base64,' + this.poster.file;
        }
    }


    saveChanges(){
        var transmition:number=(document.getElementsByClassName('transmission')[0] as HTMLSelectElement).selectedIndex;
        if(transmition==0){
            this.poster.transmission="FRONT";
        }
        else if(transmition==1){
            this.poster.transmission="REAR";
        }
        else {
            this.poster.transmission="FULL";
        }

        var fuel:number=(document.getElementsByClassName('fuel')[0] as HTMLSelectElement).selectedIndex;
        if(fuel==0){
            this.poster.fuel="PETROL";
        }
        else if(fuel==1){
            this.poster.fuel="DIESEL";
        }
        else {
            this.poster.fuel="HYBRID";
        }

        this.poster.dimension=(document.getElementsByClassName('dimension')[0] as HTMLInputElement).value;

        var currency:number=(document.getElementsByClassName('cur')[0] as HTMLSelectElement).selectedIndex;
        if(currency==0){
            this.poster.currency="USD";
            this.poster.priceUsd=+(document.getElementsByClassName('cur-input')[0] as HTMLInputElement).value;
        }
        else {
            this.poster.currency = "BLR";
            this.poster.priceBlr=+(document.getElementsByClassName('cur-input')[0] as HTMLInputElement).value;
        }

        this.poster.description=(document.getElementsByTagName("textarea")[0] as HTMLTextAreaElement).value;

        if(this.newImage) {
            this.poster.fileName=''+this.poster.id;
            this.postsService.sendFile(this.fileData, 'saveFile').subscribe(ans=> {
                console.log(ans);
            });
        }
        else {
            this.poster.fileName='';
        }
        this.postsService.sendPost(this.poster,'savePoster').subscribe(ans=>{
            this.exit();
        });
    }

    exit(){
        RouteTo.rout="personal/posters";
        this.router.navigate(["help"]);
    }

    changeCurrency(val:any){
        if(val=="$"){
            (document.getElementsByClassName("cur-input")[0] as HTMLInputElement).value=''+this.poster.priceUsd;
        }
        else
            (document.getElementsByClassName("cur-input")[0] as HTMLInputElement).value=''+this.poster.priceBlr;
    }
    selectFile(event){
        var formData=new FormData();
        formData.append('file',event.target.files[0]);
        formData.append('name',''+this.poster.id);
        this.fileData=formData;
        this.postsService.sendFile(formData,'upload').subscribe(ans=>{
            var bytes:Bytes=ans;
            this.imgPath = 'data:image/jpg;base64,'+bytes.bytes;
            this.newImage=true;
        });
    }
    get getImg() {
        return this.sanitizer.bypassSecurityTrustUrl(this.imgPath);
    }
}