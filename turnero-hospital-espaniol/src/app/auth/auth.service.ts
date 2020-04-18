
import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt"; // npm install @auth0/angular-jwt
import { environment } from './../../environments/environment';

@Injectable()
export class AuthService {  
    
    public getToken(): string {
        //return localStorage.getItem('token'); 
        // TODO: property externa
        return environment.token;
    }  
    
    public isAuthenticated(): boolean {
        const helper = new JwtHelperService();
        // get the token
        const token = this.getToken();

        // return a boolean reflecting 
        // whether or not the token is expired
        return helper.isTokenExpired(token);
    }
}