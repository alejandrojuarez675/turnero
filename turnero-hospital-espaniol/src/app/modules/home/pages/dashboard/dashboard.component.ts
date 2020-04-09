import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import * as CalendarActions from '../../../../core/store/actions/calendar.actions';
import * as FormActions from '../../../../core/store/actions/form.actions';
import * as ReservaActions from '../../../../core/store/actions/reserva.actions';
import { Calendario, Formulario, Turno } from '../../../../shared/models/datos.models';
import { BusquedaProfesionalesRequest, BusquedaHorariosRequest } from '../../../../shared/models/request.models';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  oldParams: Params = {};

  constructor(
    private route: ActivatedRoute,
    private store: Store<{ formulario: Formulario, calendario: Calendario }>
  ) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(
      (params) => this.search(params)
    );
  }

  search(params: Params): void {
    if (this.oldParams === params) { return; }

    const lastClick = params.lastClick;
    switch (lastClick) {

      case 'reserva':
        if (params.turnoSelected && this.oldParams.turnoSelected !== params.turnoSelected ||
            params.lastClick !== this.oldParams.lastClick ) {
          const turnoSelected: Turno = JSON.parse(params.turnoSelected);
          this.store.dispatch(ReservaActions.setTurnoSelected({ turnoSelected }));
        }

      // tslint:disable-next-line: no-switch-case-fall-through
      case 'turnoSelected':
        if (params.turnoSelected && this.oldParams.turnoSelected !== params.turnoSelected && lastClick !== 'reserva') {
          const turnoSelected: Turno = JSON.parse(params.turnoSelected);
          this.store.dispatch(CalendarActions.setTurnoSelected({ turnoSelected }));
          this.store.dispatch(ReservaActions.setTurnoSelected({ turnoSelected: undefined }));
        }

      // tslint:disable-next-line: no-switch-case-fall-through
      case 'busquedaHorarios':
        if (this.oldParams.fechaSelected !== params.fechaSelected) {
          const filter: BusquedaHorariosRequest = {
            ...this.getFilterToBusquedaProfesionalesFromParams(params),
            codigoProfesional: params.codigoProfesional,
            fecha: params.fechaSelected
          };
          this.store.dispatch(CalendarActions.getHorariosDisponibles({ filter }));
        }

      // tslint:disable-next-line: no-switch-case-fall-through
      case 'busquedaDiasDisponibles':
        if (params.codigoProfesional &&
          this.oldParams.codigoProfesional !== params.codigoProfesional) {

          const filter1 = {
            ...this.getFilterToBusquedaProfesionalesFromParams(params),
            codigoProfesional: params.codigoProfesional
          };
          this.store.dispatch(CalendarActions.getDiasDisponibles({ filter: filter1 }));
        }

      // tslint:disable-next-line: no-switch-case-fall-through
      case 'busquedaProfesionales':
        const filter2 = this.getFilterToBusquedaProfesionalesFromParams(params);
        const filterOld = this.getFilterToBusquedaProfesionalesFromParams(this.oldParams);
        if (JSON.stringify(filter2) !== JSON.stringify(filterOld) ||
          (params.lastClick !== this.oldParams.lastClick && lastClick === 'busquedaProfesionales')) {
          this.store.dispatch(FormActions.getBusquedaProfesionales({ filter: filter2 }));
        }
    }

    this.oldParams = params;
  }

  getFilterToBusquedaProfesionalesFromParams(params: Params): BusquedaProfesionalesRequest {
    const filter = new BusquedaProfesionalesRequest();
    filter.fechaNacimiento = params.fechaNacimiento;
    filter.codigoObraSocial = params.codigoObraSocial;
    filter.codigoPlan = params.codigoPlan;
    filter.codigoEspecialidad = params.codigoEspecialidad;
    filter.codigoCentroAtencion = params.codigoCentroAtencion;
    return filter;
  }

}
