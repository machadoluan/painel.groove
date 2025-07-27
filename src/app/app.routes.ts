import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { EstatisticasComponent } from './pages/estatisticas/estatisticas.component';
import { VipsDimaComponent } from './pages/vips-dima/vips-dima.component';
import { NovidadeComponent } from './pages/novidade/novidade.component';

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
    {
        path: 'novidades',
        component: NovidadeComponent,
        data: { title: 'Novidades' },

    },
];
