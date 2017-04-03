/**
 * Created by Влад on 01.04.2017.
 */
export class User{
    public id:number;
    public name:string;
    public login:string;
    public pass:string;
    public email:string;
    public role:string;
    constructor(name:string,login:string,pass:string,email:string){
        this.name=name;
        this.login=login;
        this.pass=pass;
        this.email=email;
        this.role="";
    }
}