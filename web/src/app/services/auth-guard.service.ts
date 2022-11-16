import { Injectable } from '@angular/core';  
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';  
import { StorageService } from './storage.service';
@Injectable({ providedIn: 'root' })  
export class AuthGuard implements CanActivate {  
    constructor(private _router: Router, private storage: StorageService) { }  
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {  
        if (this.storage.isLoggedIn()) {  
            return true;  
        }  
        this._router.navigate(['login']);  
        return false;  
    }  
} 