/**
 * Created by Влад on 06.04.2017.
 */
import { Injectable } from '@angular/core';
import { Http, Response,Headers,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import {CurLang} from "../Entities/CurLang";
import {Lang} from "../dto/Lang";

@Injectable()
export class StartupService {


    constructor(private http: Http) { }


    load(): Promise<any> {
        let bodyString = JSON.stringify(new Lang(CurLang.lang).lang);
        let headers      = new  Headers({'Content-Type': 'application/json' });
        let options       = new RequestOptions({ headers: headers});

        return this.http.post('http://localhost:8080/messageBundle', bodyString, options)
            .map((res:Response) => res.json())
            .toPromise()
            .then((data: any) => CurLang.locale=data)
            .catch((err: any) => Promise.resolve());
    }
}