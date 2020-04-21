import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// tslint:disable-next-line: max-line-length

import { CentroAtencion, CentroAtencionRespuesta, DisponibilidadDiasRespuesta, DisponibilidadRespuesta, Especialidad, EspecialidadRespuesta, HorariosRespuesta, ObraSocial, ObraSocialRespuesta, Turno, DisponibilidadDias, ReservaRespuesta, TurnoRespuesta } from '../../shared/models/datos.models';
import { BusquedaDiasDisponiblesRequest, BusquedaHorariosRequest, BusquedaProfesionalesRequest, ReservaTurnoRequest, ConfirmacionTurnoRequest } from '../../shared/models/request.models';
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
  endpointC = this.endpoint + "/Consext" ;
  endpointG = this.endpoint + "/Gestion" ;

  
  endpoint_obraSocial = this.endpointC + '/getObraSocial';
  endpoint_especialidad = this.endpointC + '/getEspecialidad';
  endpoint_centroAtencion = this.endpointG + '/getCentroAtencion';
  endpoint_busquedaProfesionales = this.endpointC + '/busquedaProfesionales';
  endpoint_busquedaDiasDisponibles = this.endpointC + '/busquedaDiasDisponibles';
  endpoint_busquedaHorarios = this.endpointC + '/busquedaHorarios';
  endpoint_reservaTurno = this.endpointC + '/reservaTurno';
  endpoint_confirmacionTurno = this.endpointC + '/confirmacionTurno';

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
            return res.obraSocial.sort((a, b) => {
              if (a.nombre > b.nombre) return 1;
              if (a.nombre < b.nombre) return -1;
              return 0;
            });
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
            return res.especialidad.sort((a, b) => {
              if (a.nombre > b.nombre) return 1;
              if (a.nombre < b.nombre) return -1;
              return 0;
            });
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
            return res.centroAtencion.sort((a, b) => {
              if (a.nombre > b.nombre) return 1;
              if (a.nombre < b.nombre) return -1;
              return 0;
            });
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
            if (res.disponibilidad == undefined || res.disponibilidad.length == 0) {
              throw new Error(`No se encontraron coincidencias para los criterios ingresados.`);
            }
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

  reservaTurno(filter: ReservaTurnoRequest): Observable<any> {
    if (this.useMockups) {
      console.log('Run mock for: reservaTurno() - filter', filter);
      return getWsFromMock(Mock.reservaTurnoMock);
    } else {
      console.log('Run to server ' + this.endpoint_reservaTurno);
      return this.http.post<ReservaRespuesta>(this.endpoint_reservaTurno, filter)
        .pipe(map(
          (res: ReservaRespuesta) => {
            throwErrorIfBadCode(res);
            return res.reserva;
          }
      ));
    }
  }

  retrieveTurno(reserva: ConfirmacionTurnoRequest): Observable<any> {
    if (this.useMockups) {
      console.log('Run mock for: retrieveTurno() - reserva', reserva);
      return getWsFromMock(Mock.turnoMock);
    } else {
      console.log('Run to server ' + this.endpoint_confirmacionTurno);
      return this.http.post<TurnoRespuesta>(this.endpoint_confirmacionTurno, reserva)
        .pipe(map(
          (res: TurnoRespuesta) => {
            throwErrorIfBadCode(res);
            return res.turno;
          }
      ));
    }
  }  
}
