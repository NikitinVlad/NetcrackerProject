import {User} from "../Entities/User";
import {Injectable} from "@angular/core";
/**
 * Created by Влад on 16.03.2017.
 */
@Injectable()
export class LocaleAuth{
    localeItem:string;
    constructor(){
        this.localeItem='currentUser';
    }
    checkAuth():boolean{
        if(localStorage.getItem(this.localeItem)){
            return true;
        }
        else {
            return false;
}
}
    logIn(user:User):void{
        localStorage.setItem(this.localeItem,JSON.stringify(user));
    }
    logOut():void{
        localStorage.removeItem(this.localeItem);
    }
    getUser():User{
        if(this.checkAuth()) {
            var user: User;
            user=Object.assign(new User("","","",""), JSON.parse(localStorage.getItem(this.localeItem)));
            return user;
        }
    }
    getRole():string{
        var user:User=this.getUser();
        return user.role;
    }
    getLogin():any{
        var user:User=this.getUser();
        return user.login;
    }
}