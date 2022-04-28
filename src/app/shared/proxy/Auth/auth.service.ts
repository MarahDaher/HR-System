import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwt: JwtHelperService) { }
  
  public getToken(): string {
    return localStorage.getItem('token');
  }
  public setToken(token) {
    localStorage.setItem('token', token);
  }

  public setUserName(user) {
    localStorage.setItem('userName', user);
  }

  isLoggedIn(): boolean {
    return false;
  }

  public isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();
    // return a boolean reflecting 
    // whether or not the token is expired
    return this.jwt.isTokenExpired(token);
  }


  // public isUser() {
  //   const token = this.getToken();
  //   let role = this.jwt.decodeToken(token)?.authorities.filter(el=>{
  //     return !!el.authority.match('ROLE')
  //   })
  //   return role&& role[0]?.authority == 'ROLE_VISITOR';
  //   }

  // public isOwner() {
  //   const token = this.getToken();
  //   let role = this.jwt.decodeToken(token)?.authorities.filter(el=>{
  //     return  !!el.authority.match('ROLE')
  //   })
  //   return role && role[0]?.authority == 'ROLE_SHOP_OWNER';
  //   }
}
