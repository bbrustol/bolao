import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BolaoPalpiteComponent } from './bolao-palpite/bolao-palpite.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ClassificacaoComponent } from './classificacao/classificacao.component';
import { AuthGuard } from './services/auth-guard.service';
import { CompararPalpitesComponent } from './comparar-palpite/comparar-palpite.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {path: 'bolao-palpites/:bolaoId', component: BolaoPalpiteComponent, canActivate: [AuthGuard] },
  { path: 'classificacao/:bolaoId', component: ClassificacaoComponent, canActivate: [AuthGuard] },
  { path: 'comparar-palpites/:bolaoId/:partidaId', component: CompararPalpitesComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
