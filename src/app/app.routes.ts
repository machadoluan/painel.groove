import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { EstatisticasComponent } from './pages/estatisticas/estatisticas.component';
import { VipsDimaComponent } from './pages/vips-dima/vips-dima.component';
import { NovidadeComponent } from './pages/novidade/novidade.component';
import { NoAuthGuard } from './guards/no-auth.guard';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [NoAuthGuard]
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        data: { title: 'Dashboard' },
        canActivate: [AuthGuard]
    },
    {
        path: 'estatisticas',
        component: EstatisticasComponent,
        data: { title: 'Estatísticas' },
        canActivate: [AuthGuard]


    },
    {
        path: 'novidades',
        component: NovidadeComponent,
        data: { title: 'Novidades' },
        canActivate: [AuthGuard]


    },
];
