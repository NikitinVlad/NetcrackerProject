import { NgModule,APP_INITIALIZER  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser' ;

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

import { MainPage } from './mainPage/main.page';
import {routes} from './app.routes';
import {RegistrationComponent} from "./registrationComponent/registration.component";
import {PostsService} from "./services/posts.service";
import {HttpModule} from "@angular/http";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";


import {ToasterModule} from 'angular2-toaster';
import {LoginComponent} from "./loginComponent/login.component";
import {LocaleAuth} from "./services/locale.auth";
import {PersonalArea} from "./personalArea/personal.area";
import {PosterComponent} from "./personalArea/postersComponent/poster.component";
import {BasketComponent} from "./personalArea/basketComponent/basket.component";
import {OfficeComponent} from "./personalArea/officeComponent/office.component";
import {PagerService} from "./services/pager.service";
import {SwapData} from "./services/communicate/swap.data";
import {HelpComponent} from "./personalArea/helpComponent/help.component";
import {StartupService} from "./services/sturtup.service";
import {AddPoster} from "./personalArea/addPosterComponent/add.poster";
import {CurrentPoster} from "./currentPosterComponent/current.poster";
import {CatalogComponent} from "./catalogComponent/catalog.component";
import {AdminComponent} from "./adminComponent/admin.component";
import {UserControl} from "./adminComponent/userControl/user.control";
import {ModelControl} from "./adminComponent/modelControl/model.control";
import {AgmCoreModule} from 'angular2-google-maps/core';
import {GoogleMap} from "./googleMap/google.map.component";





export function startupServiceFactory(startupService: StartupService): Function {
    return () => startupService.load();
}

@NgModule({
    imports:[BrowserModule,FormsModule,ReactiveFormsModule,HttpModule,ToasterModule,AgmCoreModule.forRoot({
        apiKey: 'AIzaSyCpW3itKX63qjTBrU_EaFpBsRu24lb5GLE',libraries: ["places"]
    }),RouterModule.forRoot(routes)],
    declarations:[AppComponent,MainPage,RegistrationComponent,CatalogComponent,LoginComponent,PersonalArea,PosterComponent,BasketComponent,OfficeComponent,HelpComponent,
        AddPoster,CurrentPoster,AdminComponent,UserControl,ModelControl,GoogleMap],
    providers:[StartupService,PostsService,LocaleAuth,PagerService,SwapData,{provide: APP_INITIALIZER,
        useFactory: startupServiceFactory,
        deps: [StartupService],
        multi: true}],
    bootstrap:[AppComponent]
})
export class AppModule{
}