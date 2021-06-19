import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-back-office',
  templateUrl: './back-office.component.html',
  styleUrls: ['./back-office.component.scss']
})
export class BackOfficeComponent implements OnInit {

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
  
  constructor() {}

  ngOnInit(): void {
  }

  responder(){
    console.log("hola");
  }

}
