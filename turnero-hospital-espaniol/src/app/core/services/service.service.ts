import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ObraSocial, Especialidad, CentroAtencion } from '../../shared/models/datos.models';
import { obrasSocialesMocks, centroAtencionesMocks, especialidadesMocks } from '../mocks/mocks';
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
      return getWsFromMock(obrasSocialesMocks);
    }
  }

  getEspecialidades(): Observable<Especialidad[]> {
    if (this.useMockups) {
      return getWsFromMock(especialidadesMocks);
    }
  }

  getCentrosDeAtencion(): Observable<CentroAtencion[]> {
    if (this.useMockups) {
      return getWsFromMock(centroAtencionesMocks);
    }
  }


}
