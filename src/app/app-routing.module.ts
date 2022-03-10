import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilePageComponent } from './components/file-page/file-page.component';
import { AuthGuardService } from './guard/auth-guard.service';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileResolver } from './resolvers/profile.resolver';

const routes: Routes = [
  {
    path:"app",
    component:MainComponent,
    pathMatch:"full",
    canActivate:[AuthGuardService],
    resolve:[ProfileResolver],
    children:[
      {
        path:"",
        component:FilePageComponent,
        pathMatch:"full"
      }
    ]
  },
  {
    path:"login",
    component:LoginComponent,
    pathMatch:"full"
  },
  {
    path:"register",
    component:RegisterComponent,
    pathMatch:"full"
  },
  {
    path:"",
    redirectTo:"/app",
    pathMatch:"full"
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
