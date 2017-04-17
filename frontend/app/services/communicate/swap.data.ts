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
    static currentPosterID:number;

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
    static routBeforeCurPoster:string;
}

