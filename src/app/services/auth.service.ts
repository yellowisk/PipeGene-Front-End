import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';

@Injectable()
export class AuthService {

    constructor(private router: Router, private cookieService: CookieService) { }

    loggedIn(): boolean {
        if (!this.getToken()) {
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }

    getToken(): string {
        return this.cookieService.get('token');
    }

    initSession(token: string): void {
        this.cookieService.put('token', token);
    }

    resetSession(): void {
        this.cookieService.removeAll();
        this.router.navigate(['login']);
    }
}
