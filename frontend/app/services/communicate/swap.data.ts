import {Injectable} from "@angular/core";
/**
 * Created by Влад on 02.04.2017.
 */
@Injectable()
export class SwapData{
    personalAreaServ:PersonalAreaServ=new PersonalAreaServ();
}

class PersonalAreaServ{
    static currentPage:number=2;
    static optionSelected:number=4;
    getCurrentPage():number{
        return PersonalAreaServ.currentPage;
    }
    setCurrentPage(page:number){
        PersonalAreaServ.currentPage=page;
    }
    setOptionSelected(num:number){
        PersonalAreaServ.optionSelected=num;
    }
    getOptionSelected():number{
        return PersonalAreaServ.optionSelected;
    }
}

export class RouteTo{
    static rout:string;
}

