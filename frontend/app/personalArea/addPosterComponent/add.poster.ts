/**
 * Created by Влад on 06.04.2017.
 */
import {Component} from "@angular/core";
import {SwapData, RouteTo} from "../../services/communicate/swap.data";
import {CurLang} from "../../Entities/CurLang";
import {PostsService} from "../../services/posts.service";
import {Model} from "../../Entities/Model";
import {AddInfo} from "../../dto/AddInfo";
import {Mark} from "../../Entities/Mark";
import {LocaleAuth} from "../../services/locale.auth";
import {Router} from "@angular/router";
import {NewPoster} from "../../dto/NewPoster";
@Component({
    moduleId:module.id,
    selector:"add-poster",
    templateUrl:"add.poster.html",
    styleUrls:["add.poster.css"]
})

export class AddPoster{
    years:number[]=[];
    loc:any=CurLang.locale;
    addInfo:AddInfo=new AddInfo();
    models:Model[]=[];

    constructor(private swapData:SwapData,private postsService:PostsService,private auth:LocaleAuth, private router:Router){
        RouteTo.rout="personal/addPoster";
        for(var i=2017;i>=1990;i--){
            this.years.push(i);
        }
        this.postsService.getData('getAddInfo').subscribe(data=>{
            this.addInfo=data;
        });
    }

    getModels(value:string){
        if(value!='') {
            var mark: Mark;
            for (var i = 0; i < this.addInfo.marks.length; i++) {
                if (this.addInfo.marks[i].name == value) {
                    mark = this.addInfo.marks[i];
                    break;
                }
            }
            this.postsService.sendPost(mark.id, 'getModels').subscribe(data=> {
                this.models = data;
            });
        }
        else this.models=[];
    }

    addPoster():void{
        var newPoster:NewPoster=new NewPoster();
        newPoster.idUser=this.auth.getUser().id;

        var model=(document.getElementsByTagName("select")[1] as HTMLSelectElement).value;
        for(var i=0;i<this.models.length;i++){
            if(this.models[i].name==model){
                newPoster.idModel=this.models[i].id;
                break;
            }
        }

        var city=(document.getElementsByTagName("select")[4] as HTMLSelectElement).value;
        for (var i = 0; i < this.addInfo.cities.length; i++) {
            if (this.addInfo.cities[i].name == city) {
                newPoster.idCity=this.addInfo.cities[i].id;
                break;
            }
        }

        newPoster.anotherCity=(document.getElementsByTagName("input")[1] as HTMLInputElement).value;
        newPoster.year=(document.getElementsByTagName("select")[2] as HTMLSelectElement).value;

        var currency:string=(document.getElementsByTagName("select")[3] as HTMLSelectElement).value;
        if(currency=='бел.руб' || currency=='BLR'){
            currency='BLR';
        }
        else currency='USD';
        newPoster.currency=currency;

        newPoster.cost=+(document.getElementsByTagName("input")[0] as HTMLInputElement).value;
        newPoster.description=(document.getElementsByTagName("textarea")[0] as HTMLTextAreaElement).value;

        this.postsService.sendPost(newPoster,'addNewPoster').subscribe(answer =>{
            this.swapData.personalAreaServ.setCurrentPosterID(answer);
            this.router.navigate(['poster']);
        });
    }
}