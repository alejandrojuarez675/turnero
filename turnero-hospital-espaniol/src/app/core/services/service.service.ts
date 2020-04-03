import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// tslint:disable-next-line: max-line-length
import { CentroAtencion, CentroAtencionRespuesta, DisponibilidadDiasRespuesta, DisponibilidadRespuesta, Especialidad, EspecialidadRespuesta, HorariosRespuesta, ObraSocial, ObraSocialRespuesta, Turno, DisponibilidadDias } from '../../shared/models/datos.models';
import { BusquedaDiasDisponiblesRequest, BusquedaHorariosRequest, BusquedaProfesionalesRequest } from '../../shared/models/request.models';
import * as Mock from '../mocks/mocks';
import { getWsFromMock, throwErrorIfBadCode } from '../utils/service.utils';
import { environment } from './../../../environments/environment';

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
  endpoint_busquedaHorarios = this.endpoint + '/busquedaHorarios';

  getObraSociales(): Observable<ObraSocial[]> {
    if (this.useMockups) {
      console.log('Run mock for: getObraSociales()');
      return getWsFromMock(Mock.obrasSocialesMocks);
    } else {
      console.log('Run to server ' + this.endpoint_obraSocial);
      return this.http.get<ObraSocialRespuesta>(this.endpoint_obraSocial)
        .pipe(map(
          (res: ObraSocialRespuesta) => {
            throwErrorIfBadCode(res);
            return res.obraSocial;
          }
      ));
    }
  }

  getEspecialidades(): Observable<Especialidad[]> {
    if (this.useMockups) {
      console.log('Run mock for: getEspecialidades()');
      return getWsFromMock(Mock.especialidadesMocks);
    } else {
      console.log('Run to server ' + this.endpoint_especialidad);
      return this.http.get<EspecialidadRespuesta>(this.endpoint_especialidad)
        .pipe(map(
          (res: EspecialidadRespuesta) => {
            throwErrorIfBadCode(res);
            return res.especialidad;
          }
      ));
    }
  }

  getCentrosDeAtencion(): Observable<CentroAtencion[]> {
   if (this.useMockups) {
      console.log('Run mock for: getCentrosDeAtencion()');
      return getWsFromMock(Mock.centroAtencionesMocks);
    } else {
      console.log('Run to server ' + this.endpoint_centroAtencion);
      return this.http.get<CentroAtencionRespuesta>(this.endpoint_centroAtencion)
        .pipe(map(
          (res: CentroAtencionRespuesta) => {
            throwErrorIfBadCode(res);
            return res.centroAtencion;
          }
      ));
    }
  }

  busquedaProfesionales(filter: BusquedaProfesionalesRequest): Observable<any> {
    if (this.useMockups) {
      console.log('Run mock for: busquedaProfesionales() - filter', filter);
      return getWsFromMock(Mock.profesionalesMocks);
    } else {
      console.log('Run to server ' + this.endpoint_busquedaProfesionales);
      return this.http.post<DisponibilidadRespuesta>(this.endpoint_busquedaProfesionales, filter)
        .pipe(map(
          (res: DisponibilidadRespuesta) => {
            throwErrorIfBadCode(res);
            return res.disponibilidad;
          }
      ));
    }
  }


  busquedaDiasDisponibles(filter: BusquedaDiasDisponiblesRequest): Observable<DisponibilidadDias[]> {
    if (this.useMockups) {
      console.log('Run mock for: busquedaDiasDisponibles() - filter', filter);

      // MOCK SIN ERROR
      return getWsFromMock(Mock.diasDisponiblesMock);

      // PARA PROBAR ERRORES CON MOCK
      // const mock: DisponibilidadDiasRespuesta = {
      //   dia: Mock.diasDisponiblesMock,
      //   respuesta: {
      //     codigo: 300,
      //     mensaje: 'prueba error'
      //   }
      // };
      // return getWsFromMock(mock)
      //   .pipe(map(
      //       (res: DisponibilidadDiasRespuesta) => {
      //         throwErrorIfBadCode(res);
      //         return res.dia;
      //       }
      //   ));

      } else {
      console.log('Run to server ' + this.endpoint_busquedaDiasDisponibles);
      return this.http.post<DisponibilidadDiasRespuesta>(this.endpoint_busquedaDiasDisponibles, filter)
        .pipe(map(
            (res: DisponibilidadDiasRespuesta) => {
              throwErrorIfBadCode(res);
              return res.dia;
            }
        ));
    }
  }

  busquedaHorarios(filter: BusquedaHorariosRequest): Observable<Turno[]> {
    if (this.useMockups) {
      console.log('Run mock for: busquedaHorarios() - filter', filter);
      return getWsFromMock(Mock.horariosMock);
    } else {
      console.log('Run to server ' + this.endpoint_busquedaHorarios);
      return this.http.post<HorariosRespuesta>(this.endpoint_busquedaHorarios, filter)
        .pipe(map(
          (res: HorariosRespuesta) => {
            throwErrorIfBadCode(res);
            return res.turno;
          }
      ));
    }
  }

}
