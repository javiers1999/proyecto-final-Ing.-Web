import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Ticket } from './ticket';

@Injectable({
  providedIn: 'root'
})

export class RequestService {

   constructor(private http: HttpClient) { }
   
   login(user: String, pass: String) {
      
      let creds:String = "nombre_usuario="+user+"&password="+pass;
      let opt:any = { 
         observe: 'body',
         headers: {'Content-type': 'application/x-www-form-urlencoded'}
      }
      
      return this.http.post("http://localhost/iwpf/index.php", creds, opt).pipe(catchError(this.handleError));
   }
   
   getTickets() {
      return this.http.get("http://localhost/iwpf/index.php", {observe:'body'});
   }
   
   private handleError(error: HttpErrorResponse) {
      
      if( error.status == 401 ) {
         let ediv : HTMLElement = <HTMLElement>document.getElementById("errorInfo");
         
         if( ediv !== null )
            ediv.innerHTML = "Nombre de Usuario o Contraseña erroneos";
      }
      
      return throwError('');
   }
}
