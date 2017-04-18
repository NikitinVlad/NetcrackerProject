/**
 * Created by Влад on 14.03.2017.
 */
import {Routes} from '@angular/router';
import {MainPage} from './mainPage/main.page';
import {RegistrationComponent} from "./registrationComponent/registration.component";
import {LoginComponent} from "./loginComponent/login.component";
import {PersonalArea} from "./personalArea/personal.area";
import {HelpComponent} from "./personalArea/helpComponent/help.component";
import {OfficeComponent} from "./personalArea/officeComponent/office.component";
import {PosterComponent} from "./personalArea/postersComponent/poster.component";
import {BasketComponent} from "./personalArea/basketComponent/basket.component";
import {AddPoster} from "./personalArea/addPosterComponent/add.poster";
import {CurrentPoster} from "./currentPosterComponent/current.poster";
import {CatalogComponent} from "./catalogComponent/catalog.component";






export const routes:Routes=[
    {path:"main",component:MainPage},
    {path:"registration",component:RegistrationComponent},
    {path:"login",component:LoginComponent},
    {path:"", redirectTo:"main",pathMatch:"full"},
    {path:"personal",component:PersonalArea,
        children: [
            {path: '', redirectTo: 'profile', pathMatch: 'full'},
            { path: 'profile', component: OfficeComponent },
            { path: 'posters', component: PosterComponent },
            {path:'basket', component:BasketComponent},
            {path: 'addPoster', component: AddPoster },
        ]
    },
    {path:"help",component:HelpComponent},
    {path: 'poster', component: CurrentPoster },
    {path: 'catalog', component: CatalogComponent }
]