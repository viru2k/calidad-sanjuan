import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { CapacitacionesComponent } from './pages/institucional/capacitaciones/capacitaciones.component';
import { CreditosComponent } from './pages/institucional/creditos/creditos.component';
import { QuienesSomosComponent } from './pages/institucional/quienes-somos/quienes-somos.component';
import { ContactoComponent } from './pageses/institucional/contacto/contacto.component';




export const ROUTES: Routes = [
    { path: 'inicio', component: InicioComponent },
    { path: 'institucional/capacitaciones', component: CapacitacionesComponent},
    { path: 'institucional/financiamiento', component: CreditosComponent},
    { path: 'institucional/quienessomos', component: QuienesSomosComponent  },
    { path: 'institucional/contacto', component: ContactoComponent  },
  
    { path: '', pathMatch: 'full', redirectTo: 'inicio' },
    { path: '**', pathMatch: 'full', redirectTo: 'inicio' }
];

