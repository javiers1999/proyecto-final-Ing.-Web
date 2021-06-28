import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { RequestService } from '../request.service';
import { User } from '../user';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  providers: [RequestService],
  styleUrls: ['./inicio.component.scss']
})

export class InicioComponent implements OnInit {

  formularioInicio: FormGroup;

  constructor( public fb:FormBuilder, public request:RequestService) { 
    this.formularioInicio = this.fb.group({
      usuario:['',Validators.required],
      contrasena:['',Validators.required]
    });
  }
  
  iniciarSesion(): void {
     let user:FormControl = <FormControl>this.formularioInicio.get("usuario");
     let pass:FormControl = <FormControl>this.formularioInicio.get("contrasena");
     
     if( user != null && pass != null ) {
         if(user.errors == null && pass.errors == null) {
            this.request.login(user.value, pass.value).subscribe( (res: any) => {
              
              // Si es usuario, redirigir al foro
              if( res.rol === "1" ) {
                location.assign("/foro");
              
              // Si es administrador, redirigir al back-office
              } else if( res.rol === "0" ) {
                location.assign("/admin");
              }

            });
         }            
     }
  }
   
  ngOnInit(): void {
    /*
      Al inicio de la pagina pide si hay un usuario con sesion iniciada
      y redirecciona de acuerdo al rol.

      No funciona con angular en modo de desarrollo ya que los puertos del 
      servidor de angular y de php son distintos y el id de la sesion no 
      se almacena. Se debe hacer el build primero.
    */

    this.request.getUser().subscribe( (res:User) => {
      if( res == null ) return;
      
      // Si es usuario, redirigir al foro
      if( res.rol === 1 ) {
        location.assign("/foro");
      // Si es administrador, redirigir al back-office
      } else if( res.rol === 0 ) {
        location.assign("/admin");
      }

    });
  }
}
