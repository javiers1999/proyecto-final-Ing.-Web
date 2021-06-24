import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { RequestService } from '../request.service';

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
         if(user.errors == null  && pass.errors == null) {
            this.request.login(user.value, pass.value).subscribe( res => location.assign("/foro") );
         }            
     }
  }
   
  ngOnInit(): void {

  }
}
