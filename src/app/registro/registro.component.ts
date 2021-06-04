import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder , Validators} from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  formularioRegistro:FormGroup;
  nombres:any;
  apellidos:any;
  rut:any;
  pass:any;
  correo:any;
  direccion:any;
  region:any;
  comuna:any;

  constructor(public frs:FormBuilder) {
    this.formularioRegistro = this.frs.group({
      nombre:['',Validators.required],
      apellidos:['',Validators.required],
      rut:['',Validators.required],
      pass:['',Validators.required],
      correo:['',Validators.required],
      direccion:['',Validators.required],
      region:['',Validators.required],
      comuna:['',Validators.required]
    });
  }

  ngOnInit(): void {
    this.nombres = this.formularioRegistro.get("nombres") as FormGroup;
    this.apellidos = this.formularioRegistro.get("apellidos") as FormGroup;
    this.rut = this.formularioRegistro.get("rut") as FormGroup;
    this.pass = this.formularioRegistro.get("pass") as FormGroup;
    this.correo = this.formularioRegistro.get("correo") as FormGroup;
    this.direccion = this.formularioRegistro.get("direccion") as FormGroup;
    this.region = this.formularioRegistro.get("region") as FormGroup;
    this.comuna = this.formularioRegistro.get("comuna") as FormGroup;
  }

}
