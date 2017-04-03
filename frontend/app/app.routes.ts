/**
 * Created by Влад on 14.03.2017.
 */
import {Routes} from '@angular/router';
import {MainPage} from './mainPage/main.page';
import {RegistrationComponent} from "./registrationComponent/registration.component";
import {LoginComponent} from "./loginComponent/login.component";
import {PersonalArea} from "./personalArea/personal.area";
import {HelpComponent} from "./personalArea/helpComponent/help.component";




export const routes:Routes=[
    {path:"main",component:MainPage},
    {path:"registration",component:RegistrationComponent},
    {path:"login",component:LoginComponent},
    {path:"", redirectTo:"main",pathMatch:"full"},
    {path:"personal",component:PersonalArea},
    {path:"help",component:HelpComponent}
]