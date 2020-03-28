import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
// tslint:disable-next-line: max-line-length
import { CentroAtencion, CentroAtencionRespuesta, DisponibilidadDias, DisponibilidadDiasRespuesta, DisponibilidadRespuesta, Especialidad, EspecialidadRespuesta, ObraSocial, ObraSocialRespuesta } from '../../shared/models/datos.models';
import { BusquedaDiasDisponiblesRequest, BusquedaProfesionalesRequest } from '../../shared/models/request.models';
import { centroAtencionesMocks, diasDisponiblesMock, especialidadesMocks, obrasSocialesMocks, profesionalesMocks } from '../mocks/mocks';
import { environment } from './../../../environments/environment';
import { getWsFromMock } from './../utils/observable.utils';

@Injectable()
export class ServiceService {

  constructor (
    protected http: HttpClient
    ) { }

    useMockups = environment.mockups;
    endpoint = environment.endpoint;
    endpoint_obraSocial = this.endpoint + '/getObraSocial';
    endpoint_especialidad = this.endpoint + '/getEspecialidad';
    endpoint_centroAtencion = this.endpoint + '/getCentroAtencion';
    endpoint_busquedaProfesionales = this.endpoint + '/busquedaProfesionales';
    endpoint_busquedaDiasDisponibles = this.endpoint + '/busquedaDiasDisponibles';

  getObraSociales(): Observable<ObraSocial[]> {
    if (this.useMockups) {
      console.log('Run mock for: getObraSociales()');
      return getWsFromMock(obrasSocialesMocks);
    } else {
      console.log('Run to server ' + this.endpoint_obraSocial);
      const respuesta = this.http.get<ObraSocialRespuesta>(this.endpoint_obraSocial)
        .toPromise()
        .then((obRespuesta: ObraSocialRespuesta) => {
          if (obRespuesta.respuesta.codigo === 200) {
              return obRespuesta.obraSocial;
          }
        });

      return from(respuesta);
    }
  }

  getEspecialidades(): Observable<Especialidad[]> {
    if (this.useMockups) {
      console.log('Run mock for: getEspecialidades()');
      return getWsFromMock(especialidadesMocks);
    } else {
      console.log('Run to server ' + this.endpoint_especialidad);
      const respuesta = this.http.get<EspecialidadRespuesta>(this.endpoint_especialidad)
        .toPromise()
        .then((obRespuesta: EspecialidadRespuesta) => {
          if (obRespuesta.respuesta.codigo === 200) {
              return obRespuesta.especialidad;
          }
        });

      return from(respuesta);
    }
  }

  getCentrosDeAtencion(): Observable<CentroAtencion[]> {
   if (this.useMockups) {
      console.log('Run mock for: getCentrosDeAtencion()');
      return getWsFromMock(centroAtencionesMocks);
    } else {
      console.log('Run to server ' + this.endpoint_centroAtencion);
      const respuesta = this.http.get<CentroAtencionRespuesta>(this.endpoint_centroAtencion)
        .toPromise()
        .then((obRespuesta: CentroAtencionRespuesta) => {
          if (obRespuesta.respuesta.codigo === 200) {
              return obRespuesta.centroAtencion;
          }
        });

      return from(respuesta);
    }
  }

  busquedaProfesionales(filter: BusquedaProfesionalesRequest): Observable<any> {
    if (this.useMockups) {
      console.log('Run mock for: busquedaProfesionales() - filter: '
        + JSON.stringify(filter));
      return getWsFromMock(profesionalesMocks);
    } else {
      console.log('Run to server ' + this.endpoint_busquedaProfesionales);
      const respuesta = this.http.post<DisponibilidadRespuesta>(this.endpoint_busquedaProfesionales, filter)
        .toPromise()
        .then((obRespuesta: DisponibilidadRespuesta) => {
            if (obRespuesta.respuesta.codigo === 200) {
                return obRespuesta.disponibilidad;
            }
          });

      return from(respuesta);
    }
  }


  busquedaDiasDisponibles(filter: BusquedaDiasDisponiblesRequest): Observable<DisponibilidadDias[]> {
    if (this.useMockups) {
      console.log('Run mock for: busquedaDiasDisponibles() - filter: '
        + JSON.stringify(filter));
      return getWsFromMock(diasDisponiblesMock);
    } else {
      console.log('Run to server ' + this.endpoint_busquedaDiasDisponibles);
      const respuesta = this.http.post<DisponibilidadDiasRespuesta>(this.endpoint_busquedaDiasDisponibles, filter)
        .toPromise()
        .then((obRespuesta: DisponibilidadDiasRespuesta) => {
            if (obRespuesta.respuesta.codigo === 200) {
                return obRespuesta.dia;
            }
          });

      return from(respuesta);
    }
  }
}
