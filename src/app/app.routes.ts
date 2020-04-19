import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { CapacitacionesComponent } from './pages/institucional/capacitaciones/capacitaciones.component';
import { ContactoComponent } from './pageses/institucional/contacto/contacto.component';
import { ConsultarComponent } from './pages/psicologo/consultar/consultar.component';
import { InstitucionalComponent } from './pages/institucional/institucional.component';




export const ROUTES: Routes = [
    { path: 'inicio', component: InicioComponent },
    { path: 'institucional', component: InstitucionalComponent},
    { path: 'institucional/contacto', component: ContactoComponent  },
    { path: 'psicologo/consulta', component: ConsultarComponent  },    
  
    { path: '', pathMatch: 'full', redirectTo: 'inicio' },
    { path: '**', pathMatch: 'full', redirectTo: 'inicio' }
];

