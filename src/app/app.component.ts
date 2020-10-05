import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService, AlertService } from './_services';
import { User } from './_models';

import './_content/app.less';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    currentUser: User;
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    async logout() {
        console.log('logout');
        // reset alerts on submit
        this.alertService.clear();
        this.authenticationService.logout().subscribe(data => {
            this.authenticationService.currentUserSubject.next(null);
            this.router.navigate(['/login']);
        }, err => {
            this.alertService.error(err)
        })
        
    }
}