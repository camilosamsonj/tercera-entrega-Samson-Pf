import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {
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
          this.router.navigate(['dashboard', 'home']);
        }
      },
    });
  }

  login(): void {
    if (this.authUserForm.invalid) {
      this.authUserForm.markAllAsTouched();
    } else {
      this.authService.login();
      Swal.fire({
        title: 'Inicio de Sesión Exitoso',
        icon: 'success',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  }
}
