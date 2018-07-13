import { Routes, RouterModule } from "@angular/router";

// Comonentes
import { PagesComponent } from "./pages.component";
import { ProgressComponent } from "./progress/progress.component";
import { Graficas1Component } from "./graficas1/graficas1.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { RxjsComponent } from "./rxjs/rxjs.component";
import { LoginGuardGuard } from "../services/service.index";

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate:[LoginGuardGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard', descripcion: 'Descripcion acerca del dashboard' } },
            { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress', descripcion: 'Descripcion acerca del progress' } },
            { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Graficas', descripcion: 'Descripcion acerca de las graficas' } },
            { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de la cuenta', descripcion: 'Descripcion acerca de los ajustes' } },
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJS', descripcion: 'Descripcion acerca de RxJS' } },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    },
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);