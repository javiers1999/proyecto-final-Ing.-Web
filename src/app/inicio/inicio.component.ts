import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder , Validators} from '@angular/forms';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  formularioInicio:FormGroup;
  usuario:any;
  contraseña:any;

  formularioReclamo:FormGroup;
  asunto:any;
  descripcion:any;
  categoria:any;
  prioridad:any;
  estado:any = "abierto";

  //listas para la solicitud "generica"
  listaGenericaAlta:Array<String>=[];
  listaGenericaMedia:Array<String>=[];
  listaGenericaBaja:Array<String>=[];

  //listas para la solicitud de "cambio"
  listaCambioAlta:Array<String>=[];
  listaCambioMedia:Array<String>=[];
  listaCambioBaja:Array<String>=[];

  //listas para los "incidentes"
  listaIncidenteAlta:Array<String>=[];
  listaIncidenteMedia:Array<String>=[];
  listaIncidenteBaja:Array<String>=[];

  //listas para los "problemas"
  listaProblemaAlta:Array<String>=[];
  listaProblemaMedia:Array<String>=[];
  listaProblemaBaja:Array<String>=[];

  //listas para la solicitud de "hardware"
  listaHardwareAlta:Array<String>=[];
  listaHardwareMedia:Array<String>=[];
  listaHardwareBaja:Array<String>=[];

  //listas para la solicitud de "software" nuevo
  listaSoftwareAlta:Array<String>=[];
  listaSoftwareMedia:Array<String>=[];
  listaSoftwareBaja:Array<String>=[];

  constructor( public fb:FormBuilder , public fr:FormBuilder) { 
    this.formularioInicio = this.fb.group({
      titulo:['',Validators.required],
      contraseña:['',Validators.required]
    });
    
    this.formularioReclamo = this.fr.group({
      asunto:['',Validators.required],
      descripcion:['',Validators.required],
      categoria:['',Validators.required],
      prioridad:['',Validators.required]
    });
  }

  ngOnInit(): void {
    this.asunto = this.formularioReclamo.get("asunto") as FormGroup;
    this.descripcion = this.formularioReclamo.get("descripcion") as FormGroup;
    this.categoria = this.formularioReclamo.get("categorias") as FormGroup;
    this.prioridad = this.formularioReclamo.get("prioridades") as FormGroup;
  }

  agregar(){

    if(this.categoria.value == "generica"){

      if(this.prioridad.value == "alta"){
        this.listaGenericaAlta.push(this.asunto.value);
      }else if (this.prioridad.value == "media"){
        this.listaGenericaMedia.push(this.asunto.value);
      }else if (this.prioridad.value == "baja"){
        this.listaGenericaBaja.push(this.asunto.value);
      }

    }else if (this.categoria.value == "cambio"){

      if(this.prioridad.value == "alta"){
        this.listaCambioAlta.push(this.asunto.value);
      }else if (this.prioridad.value == "media"){
        this.listaCambioMedia.push(this.asunto.value);
      }else if (this.prioridad.value == "baja"){
        this.listaCambioBaja.push(this.asunto.value);
      }

    }else if (this.categoria.value == "incidente"){

      if(this.prioridad.value == "alta"){
        this.listaIncidenteAlta.push(this.asunto.value);
      }else if (this.prioridad.value == "media"){
        this.listaIncidenteMedia.push(this.asunto.value);
      }else if (this.prioridad.value == "baja"){
        this.listaIncidenteBaja.push(this.asunto.value);
      }

    }else if (this.categoria.value == "problema"){

      if(this.prioridad.value == "alta"){
        this.listaProblemaAlta.push(this.asunto.value);
      }else if (this.prioridad.value == "media"){
        this.listaProblemaMedia.push(this.asunto.value);
      }else if (this.prioridad.value == "baja"){
        this.listaProblemaBaja.push(this.asunto.value);
      }

    }else if (this.categoria.value == "hardware"){

      if(this.prioridad.value == "alta"){
        this.listaHardwareAlta.push(this.asunto.value);
      }else if (this.prioridad.value == "media"){
        this.listaHardwareMedia.push(this.asunto.value);
      }else if (this.prioridad.value == "baja"){
        this.listaHardwareBaja.push(this.asunto.value);
      }

    }else if (this.categoria.value == "software"){

      if(this.prioridad.value == "alta"){
        this.listaSoftwareAlta.push(this.asunto.value);
      }else if (this.prioridad.value == "media"){
        this.listaSoftwareMedia.push(this.asunto.value);
      }else if (this.prioridad.value == "baja"){
        this.listaSoftwareBaja.push(this.asunto.value);
      }

    }
  }

}
