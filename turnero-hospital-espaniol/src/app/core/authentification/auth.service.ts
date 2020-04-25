
import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt"; // npm install @auth0/angular-jwt
import { environment } from './../../../environments/environment';
import { Contexto } from '../../shared/models/datos.models';
import { Store } from '@ngrx/store';
import * as ContextoSelectors from '../../core/store/selectors/contexto.selectors';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {  

    token$ : Observable<string>;
    token: string;

    constructor(
        private store: Store<{ context: Contexto }>
      ){
      }
    

    public getToken(): string {
        this.token$ = this.store.select(ContextoSelectors.getToken);
        this.token$.subscribe(token =>this.token = token);
        return this.token;
    }  
    
    public isAuthenticated(): boolean {
        const helper = new JwtHelperService();
        const token = this.getToken();
        return helper.isTokenExpired(token);
    }
}