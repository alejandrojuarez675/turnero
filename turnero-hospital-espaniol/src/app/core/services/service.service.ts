import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, of, throwError } from 'rxjs';
// tslint:disable-next-line: max-line-length
import { CentroAtencion, CentroAtencionRespuesta, DisponibilidadDias, DisponibilidadDiasRespuesta, DisponibilidadRespuesta, Especialidad, EspecialidadRespuesta, ObraSocial, ObraSocialRespuesta, ReservaRespuesta } from '../../shared/models/datos.models';
import { BusquedaDiasDisponiblesRequest, BusquedaProfesionalesRequest, ReservaTurnoRequest } from '../../shared/models/request.models';
import { centroAtencionesMocks, diasDisponiblesMock, especialidadesMocks, obrasSocialesMocks, profesionalesMocks, reservaTurnoMock } from '../mocks/mocks';
import { environment } from './../../../environments/environment';
import { getWsFromMock, throwErrorIfBadCode } from '../utils/service.utils';
import { map, catchError } from 'rxjs/operators';

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
    endpoint_reservaTurno = this.endpoint + '/reservaTurno';

  getObraSociales(): Observable<ObraSocial[]> {
    if (this.useMockups) {
      console.log('Run mock for: getObraSociales()');
      return getWsFromMock(obrasSocialesMocks);
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
      return getWsFromMock(especialidadesMocks);
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
      return getWsFromMock(centroAtencionesMocks);
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
      return getWsFromMock(profesionalesMocks);
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


  busquedaDiasDisponibles(filter: BusquedaDiasDisponiblesRequest): Observable<any> {
    if (this.useMockups) {
      console.log('Run mock for: busquedaDiasDisponibles() - filter', filter);

      // MOCK SIN ERROR
      return getWsFromMock(diasDisponiblesMock);

      // PARA PROBAR ERRORES CON MOCK
      // const mock: DisponibilidadDiasRespuesta = {
      //   dia: diasDisponiblesMock,
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

  reservaTurno(filter: ReservaTurnoRequest): Observable<any> {
    if (this.useMockups) {
      console.log('Run mock for: reservaTurno() - filter', filter);
      return getWsFromMock(reservaTurnoMock);
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

}
