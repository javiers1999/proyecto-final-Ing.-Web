import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InicioComponent } from '../app/inicio/inicio.component';
import { RegistroComponent } from '../app/registro/registro.component';

const routes: Routes = [
  {path:'',component:InicioComponent},
  {path:'registro',component:RegistroComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
