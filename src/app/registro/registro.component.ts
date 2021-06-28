import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';
import { FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { User } from '../user';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  formulario:FormGroup;
  comunas:Array<any> = [];
  regiones:Array<any> = [];

  constructor(public frs:FormBuilder, public request:RequestService) {
    this.formulario = this.frs.group({
      nombre_usuario:['',[Validators.required, Validators.maxLength(16)]],
      nombres:['',[Validators.required, Validators.maxLength(32)]],
      apellidos:['',[Validators.required, Validators.maxLength(32)]],
      rut:['',[Validators.required, Validators.min(1000000) ,Validators.max(25000000)]],
      password:['',[Validators.required, Validators.maxLength(32)]],
      conf_password:['',[Validators.required, Validators.maxLength(32)]],
      correo:['',[Validators.required, Validators.email, Validators.maxLength(64)]],
      direccion:['',[Validators.required, Validators.maxLength(128)]],
      region:['',Validators.required],
      comuna:['',Validators.required]
    });
  }

  ngOnInit(): void {
    this.request.getRegions().subscribe( (res:any) => {

      if( res.length == 2 ) {
        
        let regiones = res[0];
        let comunas = res[1];
        
        for(let i = 0; i < regiones.length; i++)
          this.regiones.push(regiones[i]);

        for(let i = 0; i < comunas.length; i++)
          this.comunas.push(comunas[i]);
      }

    });
  }

  registrarUsuario() {
    let nombre_usuario:FormControl = <FormControl>this.formulario.get("nombre_usuario");
    let nombres:FormControl = <FormControl>this.formulario.get("nombres");
    let apellidos:FormControl = <FormControl>this.formulario.get("apellidos");
    let rut:FormControl = <FormControl>this.formulario.get("rut");
    let password:FormControl = <FormControl>this.formulario.get("password");
    let conf_password:FormControl = <FormControl>this.formulario.get("conf_password");
    let correo:FormControl = <FormControl>this.formulario.get("correo");
    let direccion:FormControl = <FormControl>this.formulario.get("direccion");
    let region:FormControl = <FormControl>this.formulario.get("region");
    let comuna:FormControl = <FormControl>this.formulario.get("comuna");
    
    let error:String = "";

    if( nombre_usuario.errors != null ) {
      
      if( nombre_usuario.errors.hasOwnProperty("required") )
        error += "Debe asignar un nombre de usuario\n";
      else if( nombre_usuario.errors.hasOwnProperty("maxlength") )
        error += "Su nombre de usuario no debe superar los 16 caracteres\n";

    }

    if( nombres.errors != null ) {

      if( nombres.errors.hasOwnProperty("required") )
        error += "Debe agregar sus nombres\n";
      else if( nombres.errors.hasOwnProperty("maxlength") )
        error += "Sus nombres no deben superar los 32 caracteres\n";

    }

    if( apellidos.errors != null ) {

      if( apellidos.errors.hasOwnProperty("required") )
        error += "Debe agregar sus apellidos\n";
      else if( apellidos.errors.hasOwnProperty("maxlength") )
        error += "Sus apellidos no pueden superear los 32 caracteres\n";

    }

    if( rut.errors != null ) {

      if( rut.errors.hasOwnProperty("min") )
        error += "El rut ingresado es muy corto\n";
      else if( rut.errors.hasOwnProperty("max") )
        error += "El rut ingresado es muy extenso\n";

    }

    if( password.errors != null ) {

      if( password.errors.hasOwnProperty("required") )
        error += "Debe asignar una contraseña a su cuenta\n";
      else if( password.errors.hasOwnProperty("maxlength") )
        error += "Su contraseña no debe tener más de 32 caracteres\n";

    }

    if( !conf_password.valid ) 
      error += "Debe confirmar su contraseña\n";

    if( password.value !== conf_password.value ) 
      error += "Las contraseñas no coinciden\n";
    
    if( correo.errors != null ) {

      if( correo.errors.hasOwnProperty("required") )
        error += "Debe agregar un correo electronico\n";
      else if( correo.errors.hasOwnProperty("email") || 
               correo.errors.hasOwnProperty("maxlength") )
        error += "Su correo electrónico es inválido\n";
  
    }

    if( direccion.errors != null ) {

      if( direccion.errors.hasOwnProperty("required") )
        error += "Debe agregar una dirección\n";
      else if( direccion.errors.hasOwnProperty("maxlength") )
        error += "Su dirección no debe tener más de 128 caracteres\n";

    }

    if( !region.valid ) error += "Debe agregar una región\n";
    if( !comuna.valid ) error += "Debe agregar una comuna\n";

    if( error === "" ) {
      
      let user:User = {
        nombre_usuario: <string>nombre_usuario.value,
        nombres: <string>nombres.value,
        apellidos: <string>apellidos.value,
        rut: <number>rut.value,
        password: <string>password.value,
        mail: <string>correo.value,
        direccion: <string>direccion.value,
        region: <number>region.value,
        comuna: <number>comuna.value,
        rol: 1
      }

      this.request.register(user).subscribe( (res:any) => {

        if( res.status == 201 ) {
          this.formulario.reset();
          alert("Usuario creado con exito");
        }

      });

    } else alert(error);
  }

}
