import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, Injector } from '@angular/core';
import { HTTP_INTERCEPTORS,HttpClientModule  } from '@angular/common/http';
import { registerLocaleData,LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FacebookModule } from 'ngx-facebook';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
import { CdkTableModule } from '@angular/cdk/table';
import {MatInputModule, MatTableModule, MatToolbarModule, MatCardModule, MatProgressSpinnerModule, MatMenuModule, MatIconModule, MatButtonModule, MatFormFieldModule, MatSelectModule, MatSortModule } from '@angular/material';
import {DropdownModule} from 'primeng/dropdown';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




import { InicioComponent } from './pages/inicio/inicio.component';

import { CapacitacionesComponent } from './pages/institucional/capacitaciones/capacitaciones.component';
import { ROUTES } from './app.routes';


import localeEsAR from '@angular/common/locales/es-AR';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { AutofocusModule } from 'angular-autofocus-fix'; 
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { ContactoComponent } from './pageses/institucional/contacto/contacto.component';
import { LoadingComponent } from './shared/loading/loading.component';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {DialogModule} from 'primeng/dialog';
import {DynamicDialogModule} from 'primeng/dynamicdialog';

import { PopupNoticiaComponent } from './shared/compents/popups/popup-noticia/popup-noticia.component';
import { ConsultarComponent } from './pages/psicologo/consultar/consultar.component';
import { InstitucionalComponent } from './pages/institucional/institucional.component';
import { PresidenciaComponent } from './pages/presidencia/presidencia.component';
import { SecretariaGeneralComponent } from './pages/secretaria-general/secretaria-general.component';

registerLocaleData(localeEsAR, 'es-Ar');


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    InicioComponent,
    CapacitacionesComponent,
    ContactoComponent,
    LoadingComponent,
    PopupNoticiaComponent,
    ConsultarComponent,
    InstitucionalComponent,
    PresidenciaComponent,
    SecretariaGeneralComponent
  ],
  imports: [
    DropdownModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    CdkTableModule ,
    MatTableModule,
    DynamicDialogModule,
    DialogModule,
    ScrollPanelModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule ,
    AppRoutingModule,
    FacebookModule.forRoot(),
    NgxYoutubePlayerModule.forRoot(),
    SweetAlert2Module.forRoot(),
    AutofocusModule,
    RouterModule.forRoot( ROUTES, { useHash: true } ),
  ],
  entryComponents: [PopupNoticiaComponent],
  providers: [{ provide: LOCALE_ID, useValue: 'es-Ar' },{
    provide: HTTP_INTERCEPTORS,
    useFactory: function(injector: Injector) {
        return new JwtInterceptor(injector);
    },
    multi: true,
    deps: [Injector]
  },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
