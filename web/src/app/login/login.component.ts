import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bolao } from '../models/bolao';
import { AuthService } from '../services/auth.service';
import { BolaoService } from '../services/bolao.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private storageService: StorageService,
    private bolaoService: BolaoService, private _router: Router) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.bolaoService.getBolao().subscribe({
        next: data => {
          if (data && data.length > 0) {
            this._router.navigate(['bolao-palpites/' + data[0].id])
          }
        },
        error: err => {
          console.log(err)
        }
      })

    }
  }

  onSubmit(): void {
    const { email, password } = this.form;

    this.authService.login(email, password).subscribe({
      next: data => {
        console.log(data)
        this.storageService.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.reloadPage();
      },
      error: err => {
        this.errorMessage = err.error;
        this.isLoginFailed = true;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}