/**
 * Created by Влад on 19.04.2017.
 */
import {Component} from "@angular/core";
import {PostsService} from "../../services/posts.service";
import {Mark} from "../../Entities/Mark";
import {Model} from "../../Entities/Model";
@Component({
    moduleId:module.id,
    selector:"model-control",
    templateUrl:"model.control.html",
    styleUrls:["model.control.css"]
})
export class ModelControl{
    error:boolean=false;
    success:boolean=false;
    marks:Mark[]=[];
    models:Model[]=[];
    constructor(private postsService:PostsService){
        this.postsService.getData('getAddInfo').subscribe(ans=>{
            this.marks=ans.marks;
        });
    }
    checkField():boolean{
        if((document.getElementsByTagName("input")[0] as HTMLInputElement).value.length>0){
            return true;
        }
        else {
            this.error=true;
            return false;
        }
    }
    changeMark(){
        var mark = (document.getElementsByTagName("select")[0] as HTMLSelectElement);
            if (mark.selectedIndex == 0) {
                this.models = [];
                (document.getElementsByTagName("input")[0] as HTMLInputElement).disabled = true;
                (document.getElementsByTagName("input")[1] as HTMLInputElement).disabled = true;
            }
            else {
                (document.getElementsByTagName("input")[0] as HTMLInputElement).disabled = false;
                (document.getElementsByTagName("input")[1] as HTMLInputElement).disabled = false;
                (document.getElementsByTagName("input")[0] as HTMLInputElement).focus();
                for (var i = 0; i < this.marks.length; i++) {
                    if (mark.value == this.marks[i].name) {
                        this.postsService.sendPost(this.marks[i].id, 'getModels').subscribe(data=> {
                            this.models = data;
                        });
                    }
                }
            }
    }

    addModel() {
        if (this.checkField()) {
            var mark = (document.getElementsByTagName("select")[0] as HTMLSelectElement);
            var name = (document.getElementsByTagName("input")[0] as HTMLInputElement).value;
            var id;
            for (var i = 0; i < this.marks.length; i++) {
                if (mark.value == this.marks[i].name) {
                    id = this.marks[i].id;
                }
            }
            var model: Model = new Model(id, name);
            this.postsService.sendPost(model, 'addModel').subscribe(data=> {
                if(data==0){
                    this.error=true;
                }
                else{
                    this.success=true;
                    this.postsService.sendPost(id, 'getModels').subscribe(data=> {
                        this.models = data;
                    });
                    (document.getElementsByTagName("input")[0] as HTMLInputElement).disabled = true;
                    (document.getElementsByTagName("input")[1] as HTMLInputElement).disabled = true;
                }
            });
        }
    }

    noError(){
        this.error=false;
        this.success=false;
    }
}