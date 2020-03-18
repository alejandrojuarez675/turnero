import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ObraSocial } from '../../shared/models/datos.models';
import { obraSocialMock } from '../mocks/mocks';
import { environment } from './../../../environments/environment';
import { getWsFromMock } from './../utils/observable.utils';

@Injectable()
export class ServiceService {

  useMockups = environment.mockups;
  endpoint = environment.endpoint;

  constructor (
    // protected http: HttpClient
  ) { }

  getObraSociales(): Observable<ObraSocial[]> {
    if (this.useMockups) {
      return getWsFromMock([obraSocialMock, obraSocialMock]);
    }
  }

}
