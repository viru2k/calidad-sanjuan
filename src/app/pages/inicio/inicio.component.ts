import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { NoticiaService } from 'src/app/services/noticia.service';
import { DialogService } from 'primeng/api';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PopupNoticiaComponent } from '../../shared/compents/popups/popup-noticia/popup-noticia.component';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  providers: [DialogService]
})
export class InicioComponent implements OnInit {
  display: boolean = false;
  elementos:any[] = [];
  elementos_videos:any[] = [];
  elemento_detalle:any = null;
  loading:boolean = false;
  public safeURL: SafeResourceUrl;

  constructor(private miServicio:NoticiaService,public dialogService: DialogService,  private _sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.loadListNoticias();
    this.loadListVideos();
  }


  
  loadListNoticias() {
    this.loading = true;
       try {
           this.miServicio.getNoticias()
           .subscribe(resp => {
   
               this.elementos = resp;
               console.log(resp);
               this.loading = false;
           },
           error => { // error path
               console.log(error);
               console.log(error.status);
               this.throwAlert('error','Error: '+error.status+'  Error al cargar los registros',error.message, error.status);
               this.loading = false;
            });
       } catch (error) {
       this.throwAlert('error','Error al cargar los registros',error,error.status);
       }
   }
   

   
  
  loadListVideos() {
    this.loading = true;
       try {
           this.miServicio.getVideos()
           .subscribe(resp => {
                resp.forEach(element =>{
                  this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(resp['video_url']);
                 // this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/WovwuOFBUuY');
                  resp['video_url'] = this.safeURL;
                })
               this.elementos_videos = resp;
               console.log(resp);
               this.loading = false;
           },
           error => { // error path
               console.log(error);
               console.log(error.status);
               this.throwAlert('error','Error: '+error.status+'  Error al cargar los registros',error.message, error.status);
               this.loading = false;
            });
       } catch (error) {
       this.throwAlert('error','Error al cargar los registros',error,error.status);
       }
   }

   verDetalle(detalle: any){
    console.log(detalle);
    this.display = true;
    this.elemento_detalle = detalle;
    let data:any; 
    data = this.elemento_detalle;
    const ref = this.dialogService.open(PopupNoticiaComponent, {
    data,
     header: '', 
     
     height: '600px',
     width: '99%',
     
     dismissableMask: true
    });
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
  
