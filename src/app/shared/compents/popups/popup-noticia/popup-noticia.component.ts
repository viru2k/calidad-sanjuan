import { Component, OnInit } from '@angular/core';
import { DialogService, MessageService, DynamicDialogRef, DynamicDialogConfig } from 'primeng/api';

@Component({
  selector: 'app-popup-noticia',
  templateUrl: './popup-noticia.component.html',
  styleUrls: ['./popup-noticia.component.css'],
  providers: [MessageService,DialogService]
})
export class PopupNoticiaComponent implements OnInit {
elemento:any;
  constructor( private messageService: MessageService ,public dialogService: DialogService,  public ref: DynamicDialogRef, public config: DynamicDialogConfig ) { }

  ngOnInit() {
    console.log(this.config.data); 
    this.elemento = this.config.data;
    console.log(this.elemento);
  }
  cerrar(){
    this.ref.close();
  }

}
