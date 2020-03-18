import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ObraSocial } from '../../shared/models/datos.models';
import { obraSocialMock } from '../mocks/mocks';
import { environment } from './../../../environments/environment';

@Injectable()
export class ServiceService {

  useMockups = environment.mockups;
  endpoint = environment.endpoint;

  constructor (
    // protected http: HttpClient
  ) { }

  getObraSociales(): Observable<ObraSocial[]> {
    if (this.useMockups) {return of([obraSocialMock, obraSocialMock]); }
  }

}
