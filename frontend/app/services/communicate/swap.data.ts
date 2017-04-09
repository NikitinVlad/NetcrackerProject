import {Injectable} from "@angular/core";
/**
 * Created by Влад on 02.04.2017.
 */
@Injectable()
export class SwapData{
    personalAreaServ:PersonalAreaServ=new PersonalAreaServ();
}

class PersonalAreaServ{
    static newPoster=true;
    static optionSelected:number=4;
    setOptionSelected(num:number){
        PersonalAreaServ.optionSelected=num;
    }
    getOptionSelected():number{
        return PersonalAreaServ.optionSelected;
    }
    getNewPoster():boolean{
        return PersonalAreaServ.newPoster;
    }
    setNewPoster(val:boolean){
        PersonalAreaServ.newPoster=val;
    }
}

export class RouteTo{
    static rout:string;
}

