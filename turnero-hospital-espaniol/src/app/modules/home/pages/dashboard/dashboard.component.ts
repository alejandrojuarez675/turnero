import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as FormActions from '../../../../core/store/actions/form.actions';
import * as FormSelectors from '../../../../core/store/selectors/form.selectors';
import { CentroAtencion, Especialidad, Formulario, ObraSocial, Plan } from '../../../../shared/models/datos.models';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  obrasSociales$: Observable<ObraSocial[]>;
  planes$: Observable<Plan[]>;
  especialidades$: Observable<Especialidad[]>;
  centrosDeAtencion$: Observable<CentroAtencion[]>;

  constructor(
    private store: Store<{ formulario: Formulario }>
  ) {
    this.obrasSociales$ = store.select(FormSelectors.selectAllObrasSociales);
    this.planes$ = store.select(FormSelectors.selectPlanes);
    this.especialidades$ = store.select(FormSelectors.selectAllEspecialidades);
    this.centrosDeAtencion$ = store.select(FormSelectors.selectAllCentrosDeAtencion);
  }

  ngOnInit() {
    this.store.dispatch(FormActions.getObraSociales());
    this.store.dispatch(FormActions.getEspecialidades());
    this.store.dispatch(FormActions.getCentrosDeAtencion());
  }

  cambioFechaNacimiento(event: MatDatepickerInputEvent<Date>) {
    this.store.dispatch(FormActions.setFechaNacimiento({ fechaNacimiento: event.value }));
  }

  cambioObraSocial(event) {
    this.store.dispatch(FormActions.setObraSocialSelected({ obraSocialSelected: event.value }));
  }

  cambioPlan(event) {
    this.store.dispatch(FormActions.setPlanSelected({ planSelected: event.value }));
  }

  cambioEspecialidad(event) {
    this.store.dispatch(FormActions.setEspecialidadSelected({ especialidadSelected: event.value }));
  }

  cambioCentroDeAtencion(event) {
    this.store.dispatch(FormActions.setCentroDeAtencionSelected({ centroDeAtencionSelected: event.value }));
  }

}
