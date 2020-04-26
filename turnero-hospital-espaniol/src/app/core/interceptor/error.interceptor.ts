import {Injectable} from '@angular/core';
import {HttpHandler, HttpRequest, HttpInterceptor} from '@angular/common/http';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/internal/operators';
import {ServiceService} from '../services/service.service';
import {throwErrorToUser} from '../utils/service.utils';
import { Respuesta } from '../../shared/models/datos.models';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private errorService: ServiceService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError(error => {
        let errorMessage = '';

        if (error instanceof ErrorEvent) {
          // client-side error
          //errorMessage = `Client-side error: ${error.error.message}`;
          console.log(`Client-side error: ${error.error.message}`);
          errorMessage = `Se ha producido un error. Por favor reintente más tarde`;
        } else {
          // backend error
          if (error.error != undefined && error.error.mensaje) {
            errorMessage = `${error.error.mensaje}`;
            console.log(`Server-side error: ${error.error.codigo} ${error.error.mensaje}`);
          } else {
            //errorMessage = `Error ${error.status}: ${error.message}`;
            errorMessage = `Se ha producido un error. Por favor reintente más tarde`;
            console.log(`Error ${error.status}: ${error.message}`);
          }
        }

        throwErrorToUser(errorMessage);
        return throwError(errorMessage);
      })
    );
  }

}