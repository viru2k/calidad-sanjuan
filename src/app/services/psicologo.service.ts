import { Padron } from './../models/padron.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { URL_SERVICIOS, PARAMS } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class PsicologoService {


  private url:string  = URL_SERVICIOS + 'padron';

  constructor(public http: HttpClient) { }

  getPadronByObraSocial(consulta:string, valor:string){
    console.log(this.url+"?consulta="+consulta+"&valor="+valor);
    return this.http.get<Padron[]>(this.url+"?consulta="+consulta+"&valor="+valor);
    }
  
    getItemsObraSocial(){
      return this.http.get<any[]>(this.url+"/obra_social");
      }
    
      getLiquidacionByPsicologo(id:string){
        return this.http.get<any[]>(this.url+"/liquidacion/by/psicologo?mat_matricula="+id);
        }
      
}
