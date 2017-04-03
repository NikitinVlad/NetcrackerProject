/**
 * Created by Влад on 12.12.2016.
 */
import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import 'rxjs/add/operator/map';



@Injectable()
export class PostsService {
    constructor(private http: Http) {
    }
    sendPost(body:Object, url:string){
        let bodyString = JSON.stringify(body);
        let headers      = new  Headers({'Content-Type': 'application/json' });
        let options       = new RequestOptions({ headers: headers});
        return this.http.post('http://localhost:8080/'+url, bodyString, options)
            .map((res:Response) => res.json());
    }
    getData(url:string) {
        return this.http.get('http://localhost:8080/'+url)
            .map(res=>res.json());
    }
}

