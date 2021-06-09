import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder , Validators} from '@angular/forms';

@Component({
  selector: 'app-foro',
  templateUrl: './foro.component.html',
  styleUrls: ['./foro.component.scss']
})
export class ForoComponent implements OnInit {

  formularioReclamo:FormGroup;
  asunto:any;
  descripcion:any;
  categorias:any;
  prioridades:any;
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

  constructor(public fr:FormBuilder) { 

    this.formularioReclamo = this.fr.group({
      asunto:['',Validators.required],
      descripcion:['',Validators.required],
      categorias:['',Validators.required],
      prioridades:['',Validators.required]
    });

  }

  ngOnInit(): void {
    this.asunto = this.formularioReclamo.get("asunto") as FormGroup;
    this.descripcion = this.formularioReclamo.get("descripcion") as FormGroup;
    this.categorias = this.formularioReclamo.get("categorias") as FormGroup;
    this.prioridades = this.formularioReclamo.get("prioridades") as FormGroup;
  }

  //lenado de listas
  agregar(){

    if(this.categorias.value == "generica"){
      if(this.prioridades.value == "alta"){
        this.listaGenericaAlta.push(this.asunto.value);
      }else if (this.prioridades.value == "media"){
        this.listaGenericaMedia.push(this.asunto.value);
      }else if (this.prioridades.value == "baja"){
        this.listaGenericaBaja.push(this.asunto.value);
      }

    }else if(this.categorias.value == "cambio"){
      if(this.prioridades.value == "alta"){
        this.listaCambioAlta.push(this.asunto.value);
      }else if (this.prioridades.value == "media"){
        this.listaCambioMedia.push(this.asunto.value);
      }else if (this.prioridades.value == "baja"){
        this.listaCambioBaja.push(this.asunto.value);
      }

    }else if(this.categorias.value == "incidente"){

      if(this.prioridades.value == "alta"){
        this.listaIncidenteAlta.push(this.asunto.value);
      }else if (this.prioridades.value == "media"){
        this.listaIncidenteMedia.push(this.asunto.value);
      }else if (this.prioridades.value == "baja"){
        this.listaIncidenteBaja.push(this.asunto.value);
      }

    }else if(this.categorias.value == "problema"){

      if(this.prioridades.value == "alta"){
        this.listaProblemaAlta.push(this.asunto.value);
      }else if (this.prioridades.value == "media"){
        this.listaProblemaMedia.push(this.asunto.value);
      }else if (this.prioridades.value == "baja"){
        this.listaProblemaBaja.push(this.asunto.value);
      }

    }else if(this.categorias.value == "hardware"){

      if(this.prioridades.value == "alta"){
        this.listaHardwareAlta.push(this.asunto.value);
      }else if (this.prioridades.value == "media"){
        this.listaHardwareMedia.push(this.asunto.value);
      }else if (this.prioridades.value == "baja"){
        this.listaHardwareBaja.push(this.asunto.value);
      }

    }else if(this.categorias.value == "software"){

      if(this.prioridades.value == "alta"){
        this.listaSoftwareAlta.push(this.asunto.value);
      }else if (this.prioridades.value == "media"){
        this.listaSoftwareMedia.push(this.asunto.value);
      }else if (this.prioridades.value == "baja"){
        this.listaSoftwareBaja.push(this.asunto.value);
      }

    }

    this.formularioReclamo.reset();
  }

}
