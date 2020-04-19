import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { NoticiaService } from 'src/app/services/noticia.service';
import { DialogService } from 'primeng/api';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-capacitaciones',
  templateUrl: './capacitaciones.component.html',
  styleUrls: ['./capacitaciones.component.css'],
  providers: [DialogService]
})
export class CapacitacionesComponent implements OnInit {

  display: boolean = false;
  elementos:any[] = [];
  elementos_videos:any[] = [];
  elemento_detalle:any = null;
  loading:boolean = false;
  public safeURL: SafeResourceUrl;
  errorvideo:boolean;
  errornoticia:boolean;

  constructor(private miServicio:NoticiaService,public dialogService: DialogService,  private _sanitizer: DomSanitizer) { }

  ngOnInit() {
    console.log('cargando');
    this.loadListCapacitaciones();
  }


  
  loadListCapacitaciones() {
    this.loading = true;
    this.errornoticia = false;
       try {
           this.miServicio.getCapacitaciones()
           .subscribe(resp => {
              
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
