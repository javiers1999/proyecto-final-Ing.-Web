import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Ticket } from './ticket';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})

export class RequestService {

   private url:string = "http://localhost/iwpf/index.php";

   constructor(private http: HttpClient) { }
   
   login(user: String, pass: String) {
      
      let creds:String = "nombre_usuario="+user+"&password="+pass;
      let opt:any = { 
         observe: 'body',
         headers: {'Content-type': 'application/x-www-form-urlencoded'}
      }
      
      return this.http.post<User>(this.url, creds, opt)
                      .pipe( catchError(this.handleError) );
   }

   sendTicket(ticket:Ticket) {
      let opt:any = { 
         observe: 'response',
         headers: {'Content-type': 'application/x-www-form-urlencoded'}
      }

      return this.http.post(this.url, ticket, opt)
                      .pipe( catchError(this.handleError) );
   }

   register(user:User) {
      let opt:any = { 
         observe: 'response',
         headers: {'Content-type': 'application/x-www-form-urlencoded'}
      }

      return this.http.post(this.url, user, opt)
                      .pipe( catchError(this.handleError) );
   }
   
   private handleError(error: HttpErrorResponse) {
      let ediv : HTMLElement = <HTMLElement>document.getElementById("errorInfo");
      
      if( error.status == 401 ) {

         if( ediv !== null )
            ediv.innerHTML = "Nombre de Usuario o Contraseña erroneos";

      } else if ( error.status == 500 ) {

         if( ediv !== null )
            ediv.innerHTML = "Hubo un error en el servidor";
         else alert( error.error );
         
      }
      
      
      return throwError(error.status);
   }

   getTickets() {
      return this.http.get<Ticket>(this.url, {observe:'body'});
   }

   getUser() {
      return this.http.get<User>(this.url+"?user", {observe:'body'});
   }

   getRegions() {
      return this.http.get(this.url+"?regiones", {observe:'body'});
   }
}
