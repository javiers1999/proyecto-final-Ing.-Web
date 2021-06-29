import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RequestService } from '../request.service';
import { Ticket } from '../ticket';
import { User } from '../user';

@Component({
  selector: 'app-back-office',
  templateUrl: './back-office.component.html',
  styleUrls: ['./back-office.component.scss']
})

export class BackOfficeComponent implements OnInit {

  tickets: Array<Ticket> = [];
  filtrados: Array<Ticket> = [];
  user: Array<User> = [];
  dialog: HTMLElement | null = null;
  selectedTicket: Ticket | null = null;
  fPalabra: HTMLInputElement | null = null;
  fCategoria: HTMLSelectElement | null = null;
  fEstado: HTMLSelectElement |  null = null;

  num_usuarios: number = 0;
  num_tickets: number = 0;

  formulario: FormGroup = new FormGroup({
    estado: new FormControl(''),
    respuesta: new FormControl(''),
  });
  
  constructor(private request: RequestService) {
    this.request.getTickets().subscribe( (res:any) => {

      if( res.length == 2 ) {
        
      
        if( res[0] == null ) {

          location.assign("/");
          return;

        } else if ( res[0].rol === 1 ) {

          location.assign("/foro");
          return;

        }
       

        let user : User = res[0];
        this.user.push(user);
        
        for(let i =0; i < res[1].length; i++) {
          this.tickets.push(res[1][i]);
          this.filtrados.push(res[1][i]);
        }

      }
    });

  }

  ngOnInit(): void {
    this.request.getInfo().subscribe( (res:any) => {
      this.num_usuarios = res.usuarios;
      this.num_tickets = res.tickets;
    });

    this.dialog = <HTMLElement> document.getElementById("edit-bg");
    this.dialog.addEventListener("click", this.cerrarDialogo, false);

    let filtro : HTMLElement = <HTMLElement> document.getElementById("filter");
    if( filtro !== null ) {
      let h = parseFloat(getComputedStyle(filtro).height);
      let container : HTMLElement = <HTMLElement>document.getElementsByClassName("container")[0];
      container.style.marginTop = h + 20 + "px";
    }

    this.fPalabra = <HTMLInputElement> document.getElementById("filtro-palabra");
    this.fCategoria = <HTMLSelectElement> document.getElementById("filtro-categoria");
    this.fEstado = <HTMLSelectElement> document.getElementById("filtro-estado");

    this.fPalabra.addEventListener("keyup", ()=>this.filtrarTickets());
    this.fCategoria.addEventListener("change", ()=>this.filtrarTickets() );
    this.fEstado.addEventListener("change", ()=>this.filtrarTickets());
  }

  filtrarTickets() {
    
    this.filtrados = this.tickets.filter( (ticket:Ticket) => {

      let palabra: string = <string>this.fPalabra?.value.toLowerCase();
      let categoria: string = <string>this.fCategoria?.value;
      let estado: string = <string>this.fEstado?.value;

      return (ticket.asunto.toLowerCase().includes(palabra) || 
             ticket.descripcion.toLowerCase().includes(palabra)) &&
             String(ticket.categoria).includes(categoria) &&
             String(ticket.estado).includes(estado);
    });
  }

  actualizarTicket() {
    let newEstado : FormControl = <FormControl> this.formulario.get("estado");
    let newRespuesta : HTMLTextAreaElement = <HTMLTextAreaElement> document.getElementById("respuesta");

    if( newEstado !== null && newRespuesta !== null && this.selectedTicket !== null) {
      
      if( newEstado.value !== "" )
        this.selectedTicket.estado = newEstado.value;
      this.selectedTicket.respuesta = newRespuesta.value;

      let bg = this.dialog;
      this.request.updateTicket(this.selectedTicket).subscribe( (res:any)=> {
        if(res.status == 200) {
          alert("Ticket actualizado");
          if( bg !== null ) {
            bg.addEventListener("transitionend", (e)=>{
              if( bg !== null )  bg.style.display="none";
            }, {once:true});
            bg.style.opacity = "0";
          }
        }        
      });
    }
  }

  seleccionarTicket(id:number) {
    let i;
    
    for(i = 0; i < this.filtrados.length; i++)
      if( this.filtrados[i].id == id ) break;
    
    this.selectedTicket = this.filtrados[i];
    let estado : HTMLSelectElement = <HTMLSelectElement> document.getElementById("estado");
    let respuesta : HTMLTextAreaElement = <HTMLTextAreaElement> document.getElementById("respuesta");

    if( estado != null ) estado.value = String(this.selectedTicket.estado);
    if( respuesta != null ) respuesta.value = String(this.selectedTicket.respuesta);
    
    if( this.dialog !== null ) {
      this.dialog.style.display = "flex";

      let tid;
      let bg = this.dialog;
      let delay = function(tid:number) {
        clearTimeout(tid);
        bg.style.opacity = "1";
      }
      tid = setTimeout(delay, 20, tid);

    }
  }

  private cerrarDialogo(e:MouseEvent) {
    let bg : HTMLElement = <HTMLElement> e.target;
    if( bg.id !== "edit-bg" ) return; 

    bg.addEventListener("transitionend", (e)=>{bg.style.display="none"}, {once:true});
    bg.style.opacity = "0";
  }

}
