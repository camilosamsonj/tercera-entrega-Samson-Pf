import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { ILoginData } from './models';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {

  loginData: ILoginData = {
    email: '',
    password: ''
  };

  authUserChangeSubscription?: Subscription;
  authUserForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.authUserForm = this.fb.group({
      email: [
        '',
        [
          Validators.email,
          Validators.required,
          Validators.pattern(
            '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}'
          ),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    this.subscribeToAuthUserChange();
  }
  ngOnDestroy(): void {
    this.authUserChangeSubscription?.unsubscribe();
  }
  get emailControl() {
    return this.authUserForm.get('email');
  }
  get passwordControl() {
    return this.authUserForm.get('password');
  }

  subscribeToAuthUserChange(): void {
    this.authUserChangeSubscription = this.authService.authUser$.subscribe({
      next: (authUser) => {
        if (authUser != null) {
          this.router.navigate(['auth']);
        }
      },
    });
  }

  login(): void {
  this.authService.login(this.authUserForm.value, this.authUserForm).subscribe((loggedIn: boolean)=> {
        if(loggedIn) {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: 'success',
            title: 'Inicio de sesión exitoso'
          });
        }
      })
    } 

    onKeyDown(event: KeyboardEvent){
      if (event.key === 'Enter') {
        this.login();
        
      }
    }

  }

