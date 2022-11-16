import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BolaoPalpiteComponent } from './bolao-palpite/bolao-palpite.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'bolao-palpites/:bolaoId', component: BolaoPalpiteComponent, canActivate: [AuthGuard],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
