import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/proxy/Auth/auth.guard';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'login',          component: LoginComponent , canActivate: [AuthGuard]},
    
    { path: 'register',       component: RegisterComponent },

    {
        path: '**',
        redirectTo: 'login'
    }
];
