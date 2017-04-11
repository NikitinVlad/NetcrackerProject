import {User} from "../Entities/User";
/**
 * Created by Влад on 10.04.2017.
 */
export class CurrPoster{
    public id:number=0;
    public markName:string='';
    public modelName:string='';
    public year:number=0;
    public city:string='';
    public description:string='';
    public transmission:string='';
    public fuel:string='';
    public dimension:string='';
    public priceUsd:number=0;
    public priceBlr:number=0;
    public currency:string='';
    public date:string='';
    public file:number[]=[];
    public fileName:string="";
    public user:User=new User("","","","");

    constructor(){}
}