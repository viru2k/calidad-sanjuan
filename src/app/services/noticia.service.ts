import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { URL_SERVICIOS, PARAMS } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {

  

  private url:string  = URL_SERVICIOS ;

  constructor(public http: HttpClient) { }

  getVideos(){
    
    return this.http.get<any[]>(this.url+'video/videos');
    }

  getNoticias(){
    
    return this.http.get<any[]>(this.url+'video/noticias');
    }
    
    getFinanciamiento(){
    
      return this.http.get<any[]>(this.url+'video/financiamiento/lista');
      }
      getCapacitaciones(){
    
        return this.http.get<any[]>(this.url+'video/capacitacion/lista');
        }
      
      
}