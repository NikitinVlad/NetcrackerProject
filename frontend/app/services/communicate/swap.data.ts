import {Injectable} from "@angular/core";
/**
 * Created by Влад on 02.04.2017.
 */
@Injectable()
export class SwapData{
    personalAreaServ:PersonalAreaServ=new PersonalAreaServ();
}

class PersonalAreaServ{
    static newPoster=false;
    static optionSelected:number=4;
    static optionCatalogSelected=1;
    static currentPosterID:number;
    setOptionSelected(num:number){
        PersonalAreaServ.optionSelected=num;
    }
    getOptionSelected():number{
        return PersonalAreaServ.optionSelected;
    }
    setOptionCatalogSelected(num:number){
        PersonalAreaServ.optionCatalogSelected=num;
    }
    getOptionCatalogSelected():number{
        return PersonalAreaServ.optionCatalogSelected;
    }
    getNewPoster():boolean{
        return PersonalAreaServ.newPoster;
    }
    setNewPoster(val:boolean){
        PersonalAreaServ.newPoster=val;
    }
    setCurrentPosterID(num:number){
        PersonalAreaServ.currentPosterID=num;
    }
    getCurrentPosterID():number{
        return PersonalAreaServ.currentPosterID;
    }
}

export class RouteTo{
    static rout:string;
}

