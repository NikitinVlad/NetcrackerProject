/**
 * Created by Влад on 19.04.2017.
 */
import {Component} from "@angular/core";
import {User} from "../../Entities/User";
import {RouteTo, PersonalUser} from "../../services/communicate/swap.data";
import {CurLang} from "../../Entities/CurLang";
import {PostsService} from "../../services/posts.service";
import {PagerService} from "../../services/pager.service";
import {Router} from "@angular/router";
@Component({
    moduleId:module.id,
    selector:"user-control",
    templateUrl:"user.control.html",
    styleUrls:["user.control.css"]
})
export class UserControl{
    loc:any;

    private sizeItems: number;
    private currentItems: any[];
    how:number;

    pager: any = {};
    pagedItems: User[];

    constructor(private postsService:PostsService, private pagerService:PagerService, private router:Router){
        RouteTo.rout = 'administration/users-control';
        this.loc = CurLang.locale;

        this.postsService.getData('getUsersSize').subscribe(answer=> {
            this.sizeItems = answer;
            if(this.sizeItems<4){
                this.how=this.sizeItems;
            }
            else {
                this.how=4;
            }
            this.setPage(1);
        });
    }

    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pager = this.pagerService.getPager(this.sizeItems, page, this.how);
        this.currentItems = [this.pager.startIndex + 1, this.pager.endIndex + 1];
        this.postsService.sendPost(this.currentItems, 'getRangeUsers').subscribe(answer=> {
            this.pagedItems = answer;
        });
    }

    deleteUser(user:User){
        var index = this.pagedItems.indexOf(user, 0);
        if (index > -1) {
            this.pagedItems.splice(index, 1);
        }
        this.postsService.sendPost(user.id,'deleteUser').subscribe(ans=>{
            this.postsService.getData('getUsersSize').subscribe(answer=> {
                this.sizeItems = answer;
                if(this.sizeItems<4){
                    this.how=this.sizeItems;
                }
                else {
                    this.how=4;
                }
                this.setPage(1);
            });
        });
    }


    goCurrentUser(user:User){
        PersonalUser.user=user;
        this.router.navigate(["personal"]);
    }
}