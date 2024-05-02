import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {

  authUserChangeSubscription?: Subscription;

  constructor (private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.subscribeToAuthUserChange();
}

ngOnDestroy(): void {
    this.authUserChangeSubscription?.unsubscribe();
}

subscribeToAuthUserChange(): void {
  this.authUserChangeSubscription = this.authService.authUser$.subscribe({
    next: (authUser) => {
      if(authUser != null) {
        this.router.navigate(['dashboard', 'home']);
      }
    }
  })

}

login() {
    this.authService.login();
    Swal.fire({
      title: 'Inicio de Sesión Exitoso',
      icon: 'success',
      timer: 2000, 
      timerProgressBar: true, 
      showConfirmButton: false 
    });
  }

}
 