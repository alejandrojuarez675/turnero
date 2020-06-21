import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// tslint:disable-next-line: max-line-length

import { CentroAtencion, CentroAtencionRespuesta, DisponibilidadDiasRespuesta, DisponibilidadRespuesta, Especialidad, EspecialidadRespuesta, HorariosRespuesta, ObraSocial, ObraSocialRespuesta, Turno, DisponibilidadDias, ReservaRespuesta, TurnoRespuesta, Login, loginRespuesta, Profesional, ProfesionalRespuesta } from '../../shared/models/datos.models';
import { BusquedaDiasDisponiblesRequest, BusquedaHorariosRequest, BusquedaProfesionalesRequest, ReservaTurnoRequest, ConfirmacionTurnoRequest } from '../../shared/models/request.models';
import * as Mock from '../mocks/mocks';
import { getWsFromMock, throwErrorIfBadCode, throwErrorToUser } from '../utils/service.utils';
import { environment } from './../../../environments/environment';
import { isDate } from '@angular/common/src/i18n/format_date';

@Injectable()
export class ServiceService {

  constructor (
    protected http: HttpClient
  ) { }

  useMockups = environment.mockups;
  endpoint = environment.endpoint;
  endpointC = this.endpoint + "/Consext" ;
  endpointG = this.endpoint + "/Gestion" ;
  endpointA = this.endpoint + "/Auth" ;

  endpoint_login = this.endpointA + '/Login';
  endpoint_obraSocial = this.endpointC + '/getObraSocial';
  endpoint_especialidad = this.endpointC + '/getEspecialidad';
  endpoint_profesional = this.endpointC + '/getProfesionales';
  endpoint_centroAtencion = this.endpointG + '/getCentroAtencion';
  endpoint_busquedaProfesionales = this.endpointC + '/busquedaProfesionales';
  endpoint_busquedaDiasDisponibles = this.endpointC + '/busquedaDiasDisponibles';
  endpoint_busquedaHorarios = this.endpointC + '/busquedaHorarios';
  endpoint_reservaTurno = this.endpointC + '/reservaTurno';
  endpoint_confirmacionTurno = this.endpointC + '/confirmacionTurno';

  login(usuario: Login): Observable<any> {
    if (this.useMockups) {
      return getWsFromMock(Mock.tokenMock);
    } else {
      return this.http.post<loginRespuesta>(this.endpoint_login, usuario)
        .pipe(map(
          (res: loginRespuesta) => {
            if (res.token == undefined || res.token.length == 0) {
              throwErrorToUser(`Por favor intente más tarde.`);
            }
            return res.token;
          }
      ));
    }
  }

  getObraSociales(): Observable<ObraSocial[]> {
    if (this.useMockups) {
      return getWsFromMock(Mock.obrasSocialesMocks);
    } else {
      return this.http.get<ObraSocialRespuesta>(this.endpoint_obraSocial)
        .pipe(map(
          (res: ObraSocialRespuesta) => {
            res.obraSocial.forEach(element => {
              element.nombre = element.nombre.trim();
              element.plan.forEach(elementp => {
                elementp.nombre = elementp.nombre.trim();
              });
            });

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
      return getWsFromMock(Mock.especialidadesMocks);
    } else {
      return this.http.get<EspecialidadRespuesta>(this.endpoint_especialidad)
        .pipe(map(
          (res: EspecialidadRespuesta) => {
            throwErrorIfBadCode(res);

            res.especialidad.forEach(element => {
              element.nombre = element.nombre.trim();
            })

            return res.especialidad.sort((a, b) => {
              if (a.nombre > b.nombre) return 1;
              if (a.nombre < b.nombre) return -1;
              return 0;
            });
          }
      ));
    }
  }

  getProfesionales(): Observable<Profesional[]> {
    if (this.useMockups) {
      return getWsFromMock(Mock.profesionalesMocks);
    } else {
      return this.http.get<ProfesionalRespuesta>(this.endpoint_profesional)
        .pipe(map(
          (res: ProfesionalRespuesta) => {
            throwErrorIfBadCode(res);

            res.profesionales.forEach(element => {
              element.nombreApellido = element.nombreApellido.trim();
            })

            return res.profesionales.sort((a, b) => {
              if (a.nombreApellido > b.nombreApellido) return 1;
              if (a.nombreApellido < b.nombreApellido) return -1;
              return 0;
            });
          }
      ));
    }
  }

  getCentrosDeAtencion(): Observable<CentroAtencion[]> {
   if (this.useMockups) {
      return getWsFromMock(Mock.centroAtencionesMocks);
    } else {
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
      return getWsFromMock(Mock.profesionalesDisponibilidadMocks);
    } else {
      return this.http.post<DisponibilidadRespuesta>(this.endpoint_busquedaProfesionales, filter)
        .pipe(map(
          (res: DisponibilidadRespuesta) => {
            throwErrorIfBadCode(res);
            if (res.disponibilidad == undefined || res.disponibilidad.length == 0) {
              throwErrorToUser(`No se encontraron coincidencias para los criterios ingresados.`);
            } else {
              res.disponibilidad.forEach(element => {
                if (element.turnoManiana != undefined && element.turnoManiana.fecha != undefined) {
                  const t = element.turnoManiana.fecha.toString().split(/[- T :]/);
                  const fd = new Date(Number(t[0]), Number(t[1])-1, Number(t[2]), 
                    Number(element.turnoManiana.hora.substring(0,2)), Number(element.turnoManiana.hora.substring(3,5)));
                  element.turnoManiana.fecha = fd; 
                }
                if (element.turnoTarde != undefined && element.turnoTarde.fecha != undefined) {
                  const t = element.turnoTarde.fecha.toString().split(/[- T :]/);
                  const fd = new Date(Number(t[0]), Number(t[1])-1, Number(t[2]), 
                    Number(element.turnoTarde.hora.substring(0,2)), Number(element.turnoTarde.hora.substring(3,5)));
                  element.turnoTarde.fecha = fd; 
                }

                if (element.turnoManiana == undefined || element.turnoManiana.fecha == undefined) {
                  element.turno = element.turnoTarde;  
                } else if (element.turnoTarde == undefined || element.turnoTarde.fecha == undefined) {
                  element.turno = element.turnoManiana;  
                } else {
                  element.turno = element.turnoManiana.fecha <= element.turnoTarde.fecha ? element.turnoManiana : element.turnoTarde;
                }
              });
            }
            return res.disponibilidad;
          }
      ));
    }
  }


  busquedaDiasDisponibles(filter: BusquedaDiasDisponiblesRequest): Observable<DisponibilidadDias[]> {
    if (this.useMockups) {

      return getWsFromMock(Mock.diasDisponiblesMock);

      } else {
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
      return getWsFromMock(Mock.horariosMock2);
    } else {
      return this.http.post<HorariosRespuesta>(this.endpoint_busquedaHorarios, filter)
        .pipe(map(
          (res: HorariosRespuesta) => {
            throwErrorIfBadCode(res);
            if (res.turno == undefined || res.turno.length == 0) {
              throwErrorToUser(`No hay turnos disponibles para el día seleccionado`);
            }  
            return res.turno;
          }
        ));
      }
    }            

  reservaTurno(filter: ReservaTurnoRequest): Observable<any> {
    if (this.useMockups) {
      return getWsFromMock(Mock.reservaTurnoMock);
    } else {
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
      return getWsFromMock(Mock.turnoMock);
    } else {
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
