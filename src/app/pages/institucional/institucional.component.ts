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
  selector: 'app-institucional',
  templateUrl: './institucional.component.html',
  styleUrls: ['./institucional.component.scss'],
  providers: [DialogService]
})
export class InstitucionalComponent implements OnInit {

  display: boolean = false;
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
    
  }

  
  loadListNoticias() {
    this.errornoticia = false;
    this.loading = true;
       try {
           this.miServicio.getinformacionPublico()
           .subscribe(resp => {
             let i=0;
             let res = resp;
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
   

}
