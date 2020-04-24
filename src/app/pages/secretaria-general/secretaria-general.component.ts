import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { NoticiaService } from 'src/app/services/noticia.service';
import { DialogService } from 'primeng/api';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PopupNoticiaComponent } from '../../shared/compents/popups/popup-noticia/popup-noticia.component';
import * as $ from 'jquery';
import { PsicologoService } from '../../services/psicologo.service';

import { URL_ARCHIVO, URL_ARCHIVO_VIDEO, URL_ARCHIVO_IMAGEN } from '../../config/config';

@Component({
  selector: 'app-secretaria-general',
  templateUrl: './secretaria-general.component.html',
  styleUrls: ['./secretaria-general.component.scss'],
  providers: [DialogService]
})
export class SecretariaGeneralComponent implements OnInit {

  
  display: boolean = false;
  urgente:any= null;
  elementos:any[] = [];
  elementos_videos:any[] = [];
  elemento_detalle:any = null;
  loading:boolean = false;
  public safeURL: SafeResourceUrl;
  errorvideo:boolean;
  errornoticia:boolean;

  constructor(private miServicio:PsicologoService,public dialogService: DialogService,  private _sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.loadListNoticias();
    this.loadListVideos();
  }


  
  loadListNoticias() {
    this.errornoticia = false;
    this.loading = true;
       try {
           this.miServicio.getinformacionPublico()
           .subscribe(resp => {
             let i=0;
             let res = resp;
             let ultimo;
                 resp.forEach(element => {
                   //enlaces
                   if(res[i]['tiene_enlace']==='SI'){
                    res[i]['enlace'] = URL_ARCHIVO+res[i]['enlace'];
                   }
                   // videos
                   if(res[i]['es_video']==='SI'){
                    res[i]['enlace_video'] = URL_ARCHIVO_VIDEO+res[i]['enlace_video'];
                   }

                   if(res[i]['tiene_imagen']==='SI'){
                    res[i]['imagen'] = URL_ARCHIVO_IMAGEN+res[i]['imagen'];
                   }
                   if(!ultimo){
                     if(resp[i]['es_importante'] ==='SI'){
                       this.urgente = resp[i];
                       ultimo = true;
                       console.log('noticia');
                     }
                   }
                i++;
                });
               this.elementos = resp;
               console.log(resp);
               this.loading = false;
           },
           error => { // error path
               console.log(error);
               console.log(error.status);
             this.errornoticia = true;
               this.loading = false;
            });
       } catch (error) {
        this.errornoticia = true;
       }
   }
   

   
  
  loadListVideos() {
    this.loading = true;
    this.errorvideo = false;
     
   }


   actualizarVideo(){
     this.loadListVideos();
   }

   actualizarNoticia(){
     this.loadListNoticias();
   }

   

   photoURL(element:any) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(element);
  }

   throwAlert(estado: string, mensaje: string, motivo: string, errorNumero: string){
    let tipoerror:string;
  
    if(estado== 'success'){
        swal({
            type: 'success',
            title: 'Exito',
            text: mensaje
          })
    }
  
    if(errorNumero =='422'){
      mensaje ='Los datos que esta tratando de guardar son iguales a los que ya poseia';
      swal({   
          type: 'warning',
          title: 'Atención..',
          text: mensaje,
          footer: motivo
        })
  }
    
    if((estado== 'error')&&(errorNumero!='422')){
      if(errorNumero =='422'){
          mensaje ='Los datos que esta tratando de guardar son iguales a los que ya poseia';
      }
      if(errorNumero =='400 '){
          mensaje ='Bad Request ';
      }
      if(errorNumero =='404'){
          mensaje ='No encontrado ';
      }
      if(errorNumero =='401'){
          mensaje ='Sin autorización';
      }
      if(errorNumero =='403'){
          mensaje =' Prohibido : La consulta fue valida, pero el servidor rechazo la accion. El usuario puede no tener los permisos necesarios, o necesite una cuenta para operar ';
      }
      if(errorNumero =='405'){
          mensaje ='Método no permitido';
      }
      if(errorNumero =='500'){
          mensaje ='Error interno en el servidor';
      }
      if(errorNumero =='503'){
          mensaje ='Servidor no disponible';
      }
      if(errorNumero =='502'){
          mensaje ='Bad gateway';
      }
      
        swal({
            type: 'error',
            title: 'Oops...',
            text: mensaje,
            footer: motivo
          })
    }
  
  
  }
  }
  
