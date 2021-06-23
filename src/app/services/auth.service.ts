import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie";
import jwt_decode from "jwt-decode";

@Injectable()
export class AuthService {
  constructor(private router: Router, private cookieService: CookieService) {}

  loggedIn(): boolean {
    if (!this.getToken()) {
      this.router.navigate(["login"]);
      return false;
    }
    return true;
  }

  getToken(): string {
    return this.cookieService.get("token");
  }

  initSession(token: string): void {
    const tokenInfo = this.getDecodedAccessToken(token);
    sessionStorage.setItem('username', tokenInfo.name);
    sessionStorage.setItem('user_id', tokenInfo.userId);
    this.cookieService.put("token", token);
  }

  resetSession(): void {
    this.cookieService.removeAll();
    this.router.navigate(["login"]);
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
}
