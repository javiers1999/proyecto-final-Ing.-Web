import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder , Validators, FormControl} from '@angular/forms';
import { RequestService } from '../request.service';
import { Ticket } from '../ticket';
import { User } from '../user';

@Component({
  selector: 'app-foro',
  templateUrl: './foro.component.html',
  styleUrls: ['./foro.component.scss']
})

export class ForoComponent implements OnInit {

  formulario:FormGroup;
  tickets: Array<Ticket> = [];
  user: Array<User> = [];

  constructor(public fr:FormBuilder, private request: RequestService) { 
  
      this.request.getTickets().subscribe( (res:any) => {

        if( res.length == 2 ) {
          
          if( res[0] == null ) {
            location.assign("/");
            return;
          }

          let user : User = res[0];
          this.user.push(user);
          
          for(let i =0; i < res[1].length; i++)
            this.tickets.push(res[1][i]);
        }
      });

      this.formulario = this.fr.group({
        asunto:['',Validators.required],
        descripcion:['',Validators.required],
        categoria:['',Validators.required],
        prioridad:['',Validators.required]
      });
  }

  ngOnInit(): void { }

  enviarTicket() {
    
    let asunto:FormControl = <FormControl>this.formulario.get("asunto");
    let descripcion:FormControl = <FormControl>this.formulario.get("descripcion");
    let prioridad:FormControl = <FormControl>this.formulario.get("prioridad");
    let categoria:FormControl = <FormControl>this.formulario.get("categoria");
    let error:String = "";

    if( !asunto.valid ) error += "Debe agregar un asunto\n";
    if( !descripcion.valid ) error += "Debe agregar una descripcion\n";
    if( !prioridad.valid ) error += "Debe seleccionar una prioridad\n";
    if( !categoria.valid ) error += "Debe seleccionar una categoria\n";

    if( error === "" ) {
      
      let ticket:Ticket = {
        id:-1,
        estado: 0,
        autor: this.user[0].rut,
        asunto: <string>asunto.value,
        descripcion: <string>descripcion.value,
        prioridad: <number>prioridad.value,
        categoria: <number>categoria.value,
        respuesta: ""
      }

      this.request.sendTicket(ticket).subscribe( (res:any) => {
        if( res.status == 201 ) {
          ticket.id = parseInt(res.body);
          this.tickets.push(ticket);
          this.formulario.reset();
        }
      });

    } else alert(error);
  }

}