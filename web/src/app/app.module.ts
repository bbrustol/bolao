import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BolaoPalpiteComponent } from './bolao-palpite/bolao-palpite.component';
import { httpInterceptorProviders } from './helper/http.interceptor';
import { NavbarComponent } from './navbar/navbar.component';
import { ClassificacaoComponent } from './classificacao/classificacao.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    BolaoPalpiteComponent,
    NavbarComponent,
    ClassificacaoComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
