import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BolaoPalpiteComponent } from './bolao-palpite/bolao-palpite.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'bolao-palpites', component: BolaoPalpiteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
