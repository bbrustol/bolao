import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {
    username: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { nome, email, password, repeatPassword } = this.form;
    if (password !== repeatPassword) {
      this.errorMessage = "Senhas devem coincidir"
      this.isSignUpFailed = true;
    } else {

      this.authService.register(nome, email, password).subscribe({
        next: data => {
          this.isSuccessful = true;
          this.isSignUpFailed = false;

          this.router.navigate(['login'])
        },
        error: err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      });
    }
  }
}