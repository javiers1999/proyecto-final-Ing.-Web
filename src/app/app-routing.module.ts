import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InicioComponent } from '../app/inicio/inicio.component';
import { RegistroComponent } from '../app/registro/registro.component';
import { ForoComponent } from '../app/foro/foro.component';

const routes: Routes = [
  {path:'',component:InicioComponent},
  {path:'registro',component:RegistroComponent},
  {path:'foro',component:ForoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
