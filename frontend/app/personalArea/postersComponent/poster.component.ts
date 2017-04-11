/**
 * Created by Влад on 02.04.2017.
 */
import {Component} from "@angular/core";
import {PagerService} from "../../services/pager.service";
import * as _ from 'underscore';
import {PostsService} from "../../services/posts.service";
import {Router} from "@angular/router";
import {routes} from "../../app.routes";
import {SwapData, RouteTo} from "../../services/communicate/swap.data";
import {CurLang} from "../../Entities/CurLang";
import {LocaleAuth} from "../../services/locale.auth";
import {audit} from "rxjs/operator/audit";
import {CurrPoster} from "../../dto/CurrPoster";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
    moduleId:module.id,
    selector:"posters",
    templateUrl:"poster.component.html",
    styleUrls:["poster.component.css"]
})

export class PosterComponent {
    loc: any;


    private sizeItems: number;
    private currentItems: any[];
    options: number[] = [];

    currentSelection: number;

    pager: any = {};


    pagedItems: CurrPoster[];

    constructor(private postsService: PostsService, private pagerService: PagerService, private router: Router, private swapData: SwapData, private auth: LocaleAuth, private sanitizer: DomSanitizer) {
        RouteTo.rout = 'personal/posters';
        this.loc = CurLang.locale;
        console.log("constructor");
        this.currentSelection = this.swapData.personalAreaServ.getOptionSelected();
        this.postsService.sendPost(this.auth.getUser().id, 'getPostersSize').subscribe(answer=> {
            console.log(answer);
            this.sizeItems = answer;
            if (this.sizeItems > 20) {
                for (var i = 0; i < 20; i++) {
                    this.options.push(i + 1);
                }
            }
            else {
                for (var i = 0; i < this.sizeItems; i++) {
                    this.options.push(i + 1);
                }
            }
            this.setPage(1);
        });
    }

    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pager = this.pagerService.getPager(this.sizeItems, page, this.currentSelection);
        this.currentItems = [this.pager.startIndex + 1, this.pager.endIndex + 1, 'date', this.auth.getUser().id];
        this.postsService.sendPost(this.currentItems, 'getRangePosters').subscribe(answer=> {
            this.pagedItems = answer;
        });
    }

    setOption(sel: string) {
        var num = +sel;
        this.swapData.personalAreaServ.setOptionSelected(num);
        this.router.navigate(["help"]);
    }

    getTransmission(tr: string): string {
        if (tr == "FRONT") {
            return "привод:передний, ";
        }
        else if (tr == "REAR") {
            return "привод:задний, ";
        }
        else if (tr == "FULL") {
            return "привод:полный, ";
        }
        else return "";
    }

    getFuel(fl: string): string {
        if (fl == "PETROL") {
            return "бензин, ";
        }
        else if (fl == "DIESEL") {
            return "дизель, ";
        }
        else if (fl == "HYBRID") {
            return "гибрид, ";
        }
        else return "";
    }

    getImg(bytes: number[]) {
        var imgPath = "../../../images/noimage.png";

        if(bytes!=null){
            imgPath = 'data:image/jpg;base64,'+bytes;
        }
        return this.sanitizer.bypassSecurityTrustUrl(imgPath);
    }

    goPoster(id:number){
        this.swapData.personalAreaServ.setCurrentPosterID(id);
        RouteTo.rout="poster";
        this.router.navigate(["help"]);
    }

}