import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { CentroAtencion, Especialidad, EspecialidadRespuesta, ObraSocial, ObraSocialRespuesta, CentroAtencionRespuesta, DisponibilidadRespuesta } from '../../shared/models/datos.models';
import { BusquedaDiasDisponiblesRequest } from '../../shared/models/request.models';
import { centroAtencionesMocks, especialidadesMocks, obrasSocialesMocks, profesionalesMocks } from '../mocks/mocks';
import { environment } from './../../../environments/environment';
import { getWsFromMock } from './../utils/observable.utils';

@Injectable()
export class ServiceService {

  useMockups = environment.mockups;
  endpoint = environment.endpoint;
  endpoint_obraSocial = this.endpoint + '/getObraSocial';
  endpoint_especialidad = this.endpoint + '/getEspecialidad';
  endpoint_centroAtencion = this.endpoint + '/getCentroAtencion';
  endpoint_busquedaProfesionales = this.endpoint + '/busquedaProfesionales';

  constructor (
     protected http: HttpClient
  ) { }

  getObraSociales(): Observable<ObraSocial[]> {
    if (this.useMockups) {
      console.log('Run mock for: getObraSociales()');
      return getWsFromMock(obrasSocialesMocks);
    } else {
      console.log('Run to server ' + this.endpoint_obraSocial);
      const respuesta = this.http.get<ObraSocialRespuesta>(this.endpoint_obraSocial).toPromise().then((obRespuesta : ObraSocialRespuesta) => 
      {
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
      const respuesta = this.http.get<EspecialidadRespuesta>(this.endpoint_especialidad).toPromise().then((obRespuesta : EspecialidadRespuesta) => 
      {
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
      const respuesta = this.http.get<CentroAtencionRespuesta>(this.endpoint_centroAtencion).toPromise().then((obRespuesta : CentroAtencionRespuesta) => 
      {
        if (obRespuesta.respuesta.codigo === 200) {
            return obRespuesta.centroAtencion;
        }
      });
      return from(respuesta);
    }
  }

  busquedaProfesionales(filter: BusquedaDiasDisponiblesRequest): Observable<any> {
    if (this.useMockups) {
      console.log('Run mock for: busquedaProfesionales() - filter: '
        + JSON.stringify(filter));
      return getWsFromMock(profesionalesMocks);
    } else {
      console.log('Run to server ' + this.endpoint_busquedaProfesionales);
      const respuesta = this.http.post<DisponibilidadRespuesta>(this.endpoint_busquedaProfesionales,filter).toPromise().then((obRespuesta : DisponibilidadRespuesta) => 
      {
        if (obRespuesta.respuesta.codigo === 200) {
            return obRespuesta.disponibilidad;
        }
      });
      return from(respuesta);
    }
  }
}