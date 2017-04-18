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
import {User} from "../Entities/User";
import {LocaleAuth} from "../services/locale.auth";


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
    curUser:boolean=false;
    isAdmin=false;
    constructor(private swapData:SwapData,private postsService:PostsService,private router:Router,private sanitizer:DomSanitizer, private auth:LocaleAuth){
        this.loc=CurLang.locale;
        RouteTo.rout='poster';
        this.postsService.sendPost(swapData.personalAreaServ.getCurrentPosterID(),'getCurrentPoster').subscribe(answer=>{
            this.poster=answer;
            if(this.poster.user.id==this.auth.getUser().id){
                this.curUser=true;
            }
            if(this.auth.getUser().role=="ROLE_ADMIN"){
                this.isAdmin=true;
            }
           this.updatePoster();
        });
    }


    updatePoster(){
        if(this.curUser || this.isAdmin) {
            if (this.poster.currency == 'USD') {
                (document.getElementsByClassName('cur')[0] as HTMLSelectElement).selectedIndex = 0;
                (document.getElementsByClassName("cur-input")[0] as HTMLInputElement).value = '' + this.poster.priceUsd;
            }
            else {
                (document.getElementsByClassName('cur')[0] as HTMLSelectElement).selectedIndex = 1;
                (document.getElementsByClassName("cur-input")[0] as HTMLInputElement).value = '' + this.poster.priceBlr;
            }
            if (this.poster.transmission == "FRONT") {
                (document.getElementsByClassName('transmission')[0] as HTMLSelectElement).selectedIndex = 0;
            }
            else if (this.poster.transmission == "REAR") {
                (document.getElementsByClassName('transmission')[0] as HTMLSelectElement).selectedIndex = 1;
            }
            else {
                (document.getElementsByClassName('transmission')[0] as HTMLSelectElement).selectedIndex = 2;
            }

            if (this.poster.fuel == "PETROL") {
                (document.getElementsByClassName('fuel')[0] as HTMLSelectElement).selectedIndex = 0;
            }
            else if (this.poster.fuel == "DIESEL") {
                (document.getElementsByClassName('fuel')[0] as HTMLSelectElement).selectedIndex = 1;
            }
            else {
                (document.getElementsByClassName('fuel')[0] as HTMLSelectElement).selectedIndex = 2;
            }

            (document.getElementsByClassName('dimension')[0] as HTMLInputElement).value = this.poster.dimension;
        }
        else{
            (document.getElementsByClassName('cur')[0] as HTMLSelectElement).className="invisible";
            (document.getElementsByClassName("cur-input")[0] as HTMLInputElement).className="invisible";
            (document.getElementsByClassName('transmission')[0] as HTMLSelectElement).className="invisible";
            (document.getElementsByClassName('fuel')[0] as HTMLSelectElement).className="invisible";
            (document.getElementsByClassName('dimension')[0] as HTMLInputElement).className="invisible";
            var trans=(document.getElementsByClassName("trans")[0] as HTMLLabelElement);
            if(this.poster.transmission=="FRONT"){
                trans.innerHTML="Передний";
            }
            else if(this.poster.transmission=="REAR"){
                trans.innerHTML="Задний";
            }
            else if(this.poster.transmission=="FULL"){
                trans.innerHTML="Полный";
            }
            var fuel=(document.getElementsByClassName("fuel2")[0] as HTMLLabelElement);
            if(this.poster.fuel=="PETROL"){
                fuel.innerHTML="Бензин";
            }
            else if(this.poster.fuel=="DIESEL"){
                fuel.innerHTML="Дизель";
            }
            else if(this.poster.fuel=="HYBRID"){
                fuel.innerHTML="Гибридный";
            }
        }


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
        console.log('there');
        console.log(RouteTo.routBeforeCurPoster);
        this.router.navigate([RouteTo.routBeforeCurPoster]);
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