/**
 * Created by Влад on 08.04.2017.
 */
import {Component, Sanitizer, SecurityContext} from "@angular/core";
import {RouteTo, SwapData} from "../services/communicate/swap.data";
import {PostsService} from "../services/posts.service";
import {Router} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {Bytes} from "../dto/Bytes";

@Component({
    moduleId:module.id,
    selector:"current-poster",
    templateUrl:"current.poster.html",
    styleUrls:["current.poster.css"]
})

export class CurrentPoster{
    imgPath:any='../../images/noimage.png';
    fileData:FormData;
    constructor(private swapData:SwapData,private postsService:PostsService,private router:Router,private sanitizer:DomSanitizer){
        RouteTo.rout='poster';
    }
    selectFile(event){
        var formData=new FormData();
        formData.append('file',event.target.files[0]);
        formData.append('name',"25_34");
        this.fileData=formData;
        this.postsService.sendFile(formData,'upload').subscribe(ans=>{
            var bytes:Bytes=ans;
            this.imgPath = 'data:image/png;base64,'+bytes.bytes;
        });
    }
    get getImg() {
        return this.sanitizer.bypassSecurityTrustUrl(this.imgPath);
    }

    saveChanges(){
        this.postsService.sendFile(this.fileData,'save').subscribe(ans=>{
            console.log(ans);
        });
    }
}