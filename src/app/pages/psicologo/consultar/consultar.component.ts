
import { Component, OnInit ,ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material';
import swal from 'sweetalert2';
import { PsicologoService } from 'src/app/services/psicologo.service';
import { MatTableDataSource, MatSort } from '@angular/material';
    import { DataSource } from '@angular/cdk/table';
import { element } from '@angular/core/src/render3';
 export interface elementosos {
    mat_obra_social: string;
    os_nombre: string;
  }

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css']
})
export class ConsultarComponent implements OnInit {

  elemento:string;
    element:string;
    elementos:any[] = [];
    elementosPadron:any[] = [];
    loading:boolean;
    busqueda:string;
    textoBusqueda:string;
    dataSource;
      displayedColumns = [];
     // @ViewChild(MatSort) sort: MatSort;

      /**
       * Pre-defined columns list for user table
       */
      columnNames = [
      {
          id: "mat_matricula_psicologo",
          value: "Matricula"
      },
      {
        id: "mat_apellido",
        value: "Apellido"

      }, {
        id: "mat_nombre",
        value: "Nombre"
      },
      {
        id: "mat_domicilio_laboral",
        value: "Domicilio"

      },
      {
        id: "mat_tel_laboral",
        value: "Telefono"

      }
    ];

    constructor(public miServico:PsicologoService) {
        this.displayedColumns = this.columnNames.map(x => x.id);
    
          }
  
    ngOnInit() {
      this.loadListObraSocial();
    }
  
    applyFilter(filterValue: string) {
       // this.elementosPadron.filter = this.elementos;// filterValue.trim().toLowerCase();
      }
    
   
  
    /** CARGA LA LISTA **/
 
    buscar(){
      this.loadListPadron();
  }
  
  loadListObraSocial(){
      
     this.loading = true;
      try {
          this.miServico.getItemsObraSocial()          
          .subscribe(resp => {
          this.elementos = resp;  
          console.log(this.elementos);
          let tableArr: Element[]  = resp;
          this.dataSource = this.elementos;
    //    this.dataSource.sort = this.sort;            
              this.loading = false;
              console.log(resp);
          },
          error => { // error path
              console.log(error.message);
              console.log(error.status);
              this.throwAlert("error","Error: "+error.status+"  Error al cargar los registros",error.message, error.status);
           });    
      } catch (error) {
      this.throwAlert("error","Error al cargar los registros",error,error.status);
      }  
  }
   
  
  
  
  loadListPadron(){
      console.log(this.element);
    this.loading = true;
    try {
        this.miServico.getPadronByObraSocial("os_nombre",this.element['os_nombre'])          
        .subscribe(resp => {
        this.elementosPadron = resp;                 
            this.loading = false;
            console.log(resp);
           
        },
        error => { // error path
            console.log(error.message);
            console.log(error.status);
            this.throwAlert("error","Error: "+error.status+"  Error al cargar los registros",error.message, error.status);
         });    
    } catch (error) {
    this.throwAlert("error","Error al cargar los registros",error,error.status);
    }  
}
 
  
    
  
      imprimirTodos(){
  
      }
  
      imprimirRenglon(){
        //  this.throwAlert("success","Se creo el registro con éxito","");
      }
  
  
      
       
     
  
      throwAlert(estado:string, mensaje:string, motivo:string, errorNumero:string){
          let tipoerror:string;
  
          if(estado== "success"){
              swal({
                  type: 'success',
                  title: 'Exito',
                  text: mensaje
                })
          }
  
          if(errorNumero =="422"){
            mensaje ="Los datos que esta tratando de guardar son iguales a los que ya poseia";
            swal({   
                type: 'warning',
                title: 'Atención..',
                text: mensaje,
                footer: motivo
              })
        }
          
          if((estado== "error")&&(errorNumero!="422")){
            if(errorNumero =="422"){
                mensaje ="Los datos que esta tratando de guardar son iguales a los que ya poseia";
            }
            if(errorNumero =="400 "){
                mensaje ="Bad Request ";
            }
            if(errorNumero =="404"){
                mensaje ="No encontrado ";
            }
            if(errorNumero =="401"){
                mensaje ="Sin autorización";
            }
            if(errorNumero =="403"){
                mensaje =" Prohibido : La consulta fue valida, pero el servidor rechazo la accion. El usuario puede no tener los permisos necesarios, o necesite una cuenta para operar ";
            }
            if(errorNumero =="405"){
                mensaje ="Método no permitido";
            }
            if(errorNumero =="500"){
                mensaje ="Error interno en el servidor";
            }
            if(errorNumero =="503"){
                mensaje ="Servidor no disponible";
            }
            if(errorNumero =="502"){
                mensaje ="Bad gateway";
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
  

  export interface Element {
    position: number,
    name: string,
    weight: number,
    symbol: string
  }

 