import { Injectable } from '@angular/core';
import { ILoginData } from 'src/app/layouts/auth/models';
import { Router } from '@angular/router';
import { IUser } from 'src/app/layouts/dashboard/pages/users/models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private MOCK_AUTH_USER : IUser = {
  //   id: 1,
  //   createdAt: new Date(),
  //   email: 'email@mail.com',
  //   firstName: 'Camilo',
  //   lastName: 'Samson',
  //   role: 'ADMIN'
  // };

  private _authUser$ = new BehaviorSubject<IUser | null>(null);
  public authUser$ = this._authUser$.asObservable();

  constructor(private router: Router) { }

  login(): void {
    this._authUser$.next({
      id: 1,
      createdAt: new Date(),
      email: 'juanito@perez.cl',
      firstName: 'Juanito',
      lastName: 'Pérez',
      role: 'ADMIN'
    });
  }

  // login(data: ILoginData): void {
  //   if(data.email != 'email@email.com' || data.password != '123456') {
  //     alert('Correo o password incorrectos');
  //   } else {
  //     this._authUser$.next(this.MOCK_AUTH_USER);
  //     localStorage.setItem(
  //       'accessToken',
  //       'abcdefghijklmnñopqrstuvwxyz'
  //     );
  //     this.router.navigate(['dashboard', 'home']);
  //   }
  // }

  // verifyToken(): boolean {
  //   const token = localStorage.getItem('accessToken');
  //   if(token) {
  //     this._authUser$.next(this.MOCK_AUTH_USER);
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  logout(): void {
    this._authUser$.next(null); 
    
  }
  // logout(): void {
  //   this._authUser$.next(null); 
  //   localStorage.removeItem('accessToken')
    
  // }

}
