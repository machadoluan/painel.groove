import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { EstatisticasComponent } from './pages/estatisticas/estatisticas.component';

export const routes: Routes = [
    {
        path: '',
        component: DashboardComponent
    },
    {
        path: 'login',
        component: LoginComponent,

    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        data: { title: 'Dashboard' },

    },
    {
        path: 'estatisticas',
        component: EstatisticasComponent,
        data: { title: 'Estatísticas' },

    },
];
