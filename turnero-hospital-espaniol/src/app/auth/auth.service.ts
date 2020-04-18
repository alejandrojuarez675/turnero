
import { Injectable } from '@angular/core';
//import decode from 'jwt-decode'; // npm install jwt-decode
import { JwtHelperService } from "@auth0/angular-jwt"; // npm install @auth0/angular-jwt

@Injectable()
export class AuthService {  
    
   

    public getToken(): string {
        //return localStorage.getItem('token');
        return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6IlNPUE9SVEVJVCIsIlNlc3Npb25JZCI6ImQ2ZWJlYjM4LWIyODMtNGUxZS1iNTE3LWNkNDI0NWU3MGQyMiIsImV4cCI6MTU4NzI5ODM5MywiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzNzMvIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzNzMvIn0.PZdnCntL7BNjLZ2cO9zin403uEAc2V6Zr9qt9zqnc60'
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