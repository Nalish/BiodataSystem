import {  Routes } from "@angular/router";

import { LoginComponent } from "./login/login.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { RegisterComponent } from "./register/register.component";
import { SearchComponent } from "./search/search.component";
import { FormComponent } from "./form/form.component";


export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },//the default page
    { path: 'login', component: LoginComponent },
    {path:'dashboard',component:DashboardComponent},
    {path:'register',component:RegisterComponent},
    {path:'search',component:SearchComponent},
    {path:'form',component:FormComponent},
]
