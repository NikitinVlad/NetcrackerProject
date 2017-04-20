/**
 * Created by Влад on 12.12.2016.
 */
import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';

import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Router} from "@angular/router";
import {LocaleAuth} from "./locale.auth";




@Injectable()
export class PostsService {
    constructor(private http: Http, private router:Router,private auth:LocaleAuth) {
    }
    createAuthorizationHeader(headers:Headers) {
        var login;
        if(localStorage.getItem('currentUser')!=null){
            login=JSON.parse(localStorage.getItem('currentUser')).login;
            headers.append('Authorization',login);
        }
    }
    sendPost(body:Object, url:string){
        let bodyString = JSON.stringify(body);
        let headers      = new  Headers({'Content-Type': 'application/json' });

        this.createAuthorizationHeader(headers);
        let options       = new RequestOptions({ headers: headers});
        return this.http.post('http://localhost:8080/'+url, bodyString, options)
            .map((res:Response) =>res.json()
        ).catch((err: any) => {
                if(err.status==403){
                    this.auth.logOut();
                    this.router.navigate(['login']);
                }
                return Promise.resolve();
            });
    }
    getData(url:string) {
        let headers=new Headers();
        this.createAuthorizationHeader(headers);
        let options       = new RequestOptions({ headers: headers});
        return this.http.get('http://localhost:8080/'+url,options)
            .map(res=>res.json()).catch((err: any) => {
                if(err.status==403){
                    this.auth.logOut();
                    this.router.navigate(['login']);
                }
                return Promise.resolve();
            });
    }
    sendFile(file:any,url:string){
        let headers      = new  Headers({'Accept': 'multipart/form-data, application/json'});
        this.createAuthorizationHeader(headers);
        let options       = new RequestOptions({ headers: headers});
        return this.http.post('http://localhost:8080/'+url, file, options)
            .map((res:Response) => res.json()).catch((err: any) => {
                if(err.status==403){
                    this.auth.logOut();
                    this.router.navigate(['login']);
                }
                return Promise.resolve();
            });
        }


}

