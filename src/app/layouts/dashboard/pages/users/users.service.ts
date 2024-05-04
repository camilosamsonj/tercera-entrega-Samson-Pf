import { Injectable } from '@angular/core';
import { CreateUserPayload, IUser } from './models';
import {
  catchError,
  concatMap,
  delay,
  first,
  forkJoin,
  Observable,
  of,
  throwError,
} from 'rxjs';


let USERS_DB: IUser[] = [ {

    id: 101,
    firstName: 'Camilo',
    lastName: 'Samson',
    email: 'camilosamson@outlook.com',
    role: 'ADMIN',
    createdAt: new Date,
    },
    {
    id: 102,
    firstName: 'Andres',
    lastName: 'Smith',
    email: 'andressmith@gmail.com',
    role: 'USER',
    createdAt: new Date,
    }
]

@Injectable({
  providedIn: 'root',
})

export class UsersService {

  constructor() {}

  getUsers(): Observable<IUser[]> {
    return of(USERS_DB);
     }

}
