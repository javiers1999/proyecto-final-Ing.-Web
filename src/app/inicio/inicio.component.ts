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

  constructor( public fb:FormBuilder){ 
    this.formularioInicio = this.fb.group({
      titulo:['',Validators.required],
      contraseña:['',Validators.required]
    });
  }

  ngOnInit(): void {
  }

}
