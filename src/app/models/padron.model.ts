export class Padron {

    id:string;
    nombre:string;
    apellido:string;
    obra_social_id:string;
    obra_social_nombre:string;

    constructor( 
        id:string,
        apellido:string,
        obra_social_id:string,
        obra_social_nombre:string
        ) {
       
        this.id = id;
        this.apellido= apellido;
        this.obra_social_id=obra_social_id;
        this.obra_social_nombre=obra_social_nombre;
       

   }
}